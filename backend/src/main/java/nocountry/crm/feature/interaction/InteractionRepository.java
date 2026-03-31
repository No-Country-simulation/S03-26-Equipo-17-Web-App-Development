package nocountry.crm.feature.interaction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InteractionRepository extends JpaRepository<Interaction, Long> {

    Page<Interaction> findByLeadIdOrderByCreatedAtDesc(Long leadId, Pageable pageable);
}
