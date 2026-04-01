package nocountry.crm.feature.auth.service;

import nocountry.crm.feature.auth.dto.AuthResponse;
import nocountry.crm.feature.auth.dto.LoginRequest;
import nocountry.crm.feature.auth.dto.RegisterRequest;
import nocountry.crm.feature.auth.entity.Role;
import nocountry.crm.feature.auth.entity.User;
import nocountry.crm.feature.auth.repository.UserRepository;
import nocountry.crm.feature.auth.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already in use");
        }

        // Se reemplazó "new User(...)" por el patrón Builder de Lombok
        var user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .firstName(request.firstName())
                .lastName(request.lastName())
                .role(Role.ROLE_USER) // Rol por defecto
                .build();

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return new AuthResponse(jwtToken, refreshToken);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return new AuthResponse(jwtToken, refreshToken);
    }

    public AuthResponse refreshToken(String refreshToken) {
        String userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                return new AuthResponse(accessToken, refreshToken);
            }
        }
        throw new IllegalArgumentException("Invalid refresh token");
    }
}