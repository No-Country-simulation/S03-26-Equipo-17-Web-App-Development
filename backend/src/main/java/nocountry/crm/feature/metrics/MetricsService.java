package nocountry.crm.feature.metrics;

import lombok.RequiredArgsConstructor;
import nocountry.crm.feature.lead.LeadRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MetricsService {

    private final LeadRepository leadRepository;


    public MetricsResponse getGlobalStats(MetricsFilter filter) {

        //Se covierte de LocalDate a LocalDateTime para evitar errores con la base de datos
        LocalDateTime startOfDay = filter.from().atStartOfDay();
        LocalDateTime endOfDay = filter.to().atTime(LocalTime.MAX);

        List<Object[]> results = leadRepository.countLeadsByStatus(startOfDay, endOfDay);
        long staleCount = leadRepository.countStaleLeadsInRange(startOfDay, endOfDay);

        Map<String, Long> statsByStatus = new HashMap<>();
        long totalLeads = 0;

        for (Object[] row : results) {
            //row[0] es el LeadStatus (Eenum)
            String statusName = row[0].toString();
            //row[1] es el Count (Long)
            Long count = (Long) row[1];

            statsByStatus.put(statusName, count);
            totalLeads += count;
        }

        long leads = statsByStatus.getOrDefault("LEAD", 0L);
        double conversionRate = calculateConversionRate(totalLeads, leads);

        return new MetricsResponse(
                totalLeads,
                statsByStatus,
                conversionRate,
                staleCount,
                filter.from(),
                filter.to()
        );
    }

    private double calculateConversionRate(long total, long converted) {
        if (total == 0) {
            return 0.0;
        }
        double rate = ((double) converted / total) * 100;

        return Math.round(rate * 100.0) / 100.0;
    }
}
