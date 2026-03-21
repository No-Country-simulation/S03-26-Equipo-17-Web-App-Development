package nocountry.crm.feature.lead;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    @PostMapping
    public ResponseEntity<LeadResponse> crearLead(@Valid @RequestBody LeadRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leadService.crearLead(request));
    }

    @GetMapping
    public ResponseEntity<List<LeadResponse>> listarLeads() {
        return ResponseEntity.ok(leadService.listarLeads());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(leadService.obtenerPorId(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LeadResponse> cambiarEstado(
            @PathVariable Long id,
            @RequestParam EstadoLead nuevoEstado) {
        return ResponseEntity.ok(leadService.cambiarEstado(id, nuevoEstado));
    }

    @PatchMapping("/{id}/atender")
    public ResponseEntity<LeadResponse> marcarAtendido(@PathVariable Long id) {
        return ResponseEntity.ok(leadService.marcarAtendido(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLead(
            @PathVariable Long id,
            @RequestParam Long userId) {
        leadService.eliminarLead(id, userId);
        return ResponseEntity.noContent().build();
    }

}
