package nocountry.crm.feature.metrics;

import lombok.RequiredArgsConstructor;
import nocountry.crm.feature.lead.Lead;
import nocountry.crm.feature.lead.LeadRepository;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class CsvExportService {

    private final LeadRepository leadRepository;

    public ExportFileResponse getLeadsCsvExport(MetricsFilter filter) {

        //Trae los datos de Base de Datos.
        List<Lead> leads = leadRepository.findByCreatedAtBetween(
                filter.from().atStartOfDay(),
                filter.to().atTime(LocalTime.MAX)
        );

        String content = buildCsvString(leads);

        //Formatea a utf-8 para símbolos estándar
        byte[] contentBytes = content.getBytes(StandardCharsets.UTF_8);

        Resource resource = new ByteArrayResource(contentBytes);

        //Se define el nombre del archivo.
        String fileName = String.format("reporte_leads_%s_al_%s", filter.from(), filter.to());

        return new ExportFileResponse(resource, fileName);
    }

    private String buildCsvString (List<Lead> leads) {
        StringBuilder sb = new StringBuilder();
        sb.append(simplifyText("ID;Nombre;Email;Estado;Fecha de Creación\n"));

        //Formatea la fecha solo con día, mes, año y hora, para mayor legibilidad.
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

        for (Lead lead : leads) {
            String cleanName = simplifyText(lead.getNombre());

            sb.append(lead.getId()).append(";")
                    .append(escapeCsvField(cleanName)).append(";")
                    .append(lead.getEmail()).append(";")
                    .append(lead.getEstado()).append(";")
                    .append(lead.getCreatedAt().format(formatter)).append("\n");
        }
        return sb.toString();
    }

    //Método para eliminar los acentos de las palabras para evitar errores de codificación de los símbolos.
    private String simplifyText(String text) {
        if (text == null) return "";

        //Normaliza el texto para quitar las tildes de las palabras
        String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);

        //Elimina los símbolos de acentos usando Regex
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalized).replaceAll("");
    }

    private String escapeCsvField(String field) {
        if (field == null) return "";
        return field.contains(";") ? "\"" + field + "\"" : field;
    }

}
