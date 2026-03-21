package nocountry.crm.feature.lead;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    List<Lead> findByEstado(EstadoLead estado);

    List<Lead> findByDeletedAtIsNull();

    Optional<Lead> findByTelefono(String telefono);

    @Query("SELECT l FROM Lead l WHERE l.estado = :estado AND l.stale = false AND l.lastActivity < :limite")
    List<Lead> buscarCandidatosAStale(EstadoLead estado, LocalDateTime limite);
}
