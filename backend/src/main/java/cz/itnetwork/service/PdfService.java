package cz.itnetwork.service;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import cz.itnetwork.dto.InvoiceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;

/** Service responsible for generating invoice PDF documents from Thymeleaf templates. */
@Service
public class PdfService {

    @Autowired
    private TemplateEngine templateEngine;

    /**
     * Generates a PDF for the given invoice.
     *
     * @param invoice invoice data to render
     * @return PDF file as a byte array
     */
    public byte[] generateInvoicePdf(InvoiceDTO invoice) throws Exception {
        // Pass invoice data to the Thymeleaf template
        Context context = new Context();
        context.setVariable("invoice", invoice);

        // Render the HTML template with the invoice data
        String html = templateEngine.process("invoice", context);

        // Convert the rendered HTML to PDF
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.withHtmlContent(html, null);
        builder.toStream(baos);
        builder.run();

        return baos.toByteArray();
    }
}
