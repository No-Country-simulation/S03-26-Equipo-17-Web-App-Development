package nocountry.crm.feature.lead;

import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
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

    // Esta consulta cuenta todos los Leads por estado de una sola vez.
    @Query("""
            SELECT l.estado,
            COUNT(l) from Lead l
            WHERE l.createdAt BETWEEN
            :from AND :to
            GROUP BY l.estado
            """)
    List<Object[]> countLeadsByStatus(LocalDateTime from, LocalDateTime to);

    //Consulta para contar los Leads inactivos
    @Query("""
            SELECT COUNT(l) FROM
            Lead l WHERE l.stale = true
            AND l.createdAt BETWEEN
            :from AND :to
            """)
    long countStaleLeadsInRange(LocalDateTime from, LocalDateTime to);
}
