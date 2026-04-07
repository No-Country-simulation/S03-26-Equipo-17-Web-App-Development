package nocountry.crm.feature.metrics;

import org.springframework.core.io.Resource;

public record ExportFileResponse(
        Resource resource,
        String fileName
) {
}
