package cz.itnetwork.controller;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.service.ExcelService;
import cz.itnetwork.service.InvoiceService;
import cz.itnetwork.service.PersonService;
import cz.itnetwork.service.PdfService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * REST controller for invoice management.
 * Handles CRUD operations and provides lookup endpoints by seller/buyer identification number.
 */
@RestController
@RequestMapping("/api")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private ExcelService excelService;

    @Autowired
    private PersonService personService;

    /**
     * Creates a new invoice.
     *
     * @param invoiceDTO invoice data from the request body
     * @return created invoice with HTTP 201 Created status
     */
    @PostMapping("/invoices")
    public ResponseEntity<InvoiceDTO> addInvoice(@RequestBody InvoiceDTO invoiceDTO){
        InvoiceDTO created = invoiceService.addInvoice(invoiceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created); // Return 201 Created instead of default 200
    }

    /**
     * Returns a filtered list of all invoices.
     * Supports optional filters: buyerID, sellerID, product, minPrice, maxPrice, limit.
     *
     * @param filter query parameters mapped to {@link InvoiceFilter}
     * @return list of matching invoices
     */
    @GetMapping("/invoices")
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter filter) {
        return invoiceService.getAllInvoices(filter);
    }

    /**
     * Returns aggregate invoice statistics (current year sum, all-time sum, total count).
     *
     * @return invoice statistics
     */
    @GetMapping("/invoices/statistics")
    public InvoiceStatisticsDTO getInvoiceStatistics() {
        return invoiceService.getInvoiceStatistics();
    }

    /**
     * Updates an existing invoice.
     *
     * @param invoiceId ID of the invoice to update
     * @param invoiceDTO new invoice data
     * @return updated invoice
     */
    @PutMapping("/invoices/{invoiceId}")
    public InvoiceDTO editInvoice(@PathVariable Long invoiceId, @RequestBody InvoiceDTO invoiceDTO){
        return invoiceService.editInvoice(invoiceId, invoiceDTO);
    }

    /**
     * Returns the detail of a single invoice.
     *
     * @param invoiceId ID of the invoice to fetch
     * @return invoice detail
     */
    @GetMapping("/invoices/{invoiceId}")
    public InvoiceDTO getInvoiceDetail(@PathVariable Long invoiceId){
        return invoiceService.getInvoiceDetail(invoiceId);
    }

    /**
     * Deletes an invoice by ID.
     *
     * @param invoiceId ID of the invoice to delete
     * @return HTTP 204 No Content
     */
    @DeleteMapping("/invoices/{invoiceId}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long invoiceId) {
        invoiceService.deleteInvoice(invoiceId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Returns all invoices where the seller matches the given identification number.
     *
     * @param identificationNumber seller's business identification number
     * @return list of invoices issued by the seller
     */
    @GetMapping("/identification/{identificationNumber}/sales")
    public List<InvoiceDTO> getInvoicesBySeller(@PathVariable String identificationNumber) {
        return invoiceService.getInvoicesBySeller(identificationNumber);
    }

    /**
     * Returns all invoices where the buyer matches the given identification number.
     *
     * @param identificationNumber buyer's business identification number
     * @return list of invoices received by the buyer
     */
    @GetMapping("/identification/{identificationNumber}/purchases")
    public List<InvoiceDTO> getInvoicesByBuyer(@PathVariable String identificationNumber) {
        return invoiceService.getInvoicesByBuyer(identificationNumber);
    }


    /**
     * Generates and returns a PDF document for the given invoice.
     *
     * @param id ID of the invoice to render as PDF
     * @return PDF file displayed inline in the browser
     */
    @GetMapping("/invoices/{id}/pdf")
    public ResponseEntity<byte[]> getInvoicePdf(@PathVariable Long id) throws Exception {
        InvoiceDTO invoice = invoiceService.getInvoiceDetail(id);
        byte[] pdf = pdfService.generateInvoicePdf(invoice);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=faktura.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    /**
     * Exports person revenue statistics as a downloadable Excel (.xlsx) file.
     *
     * @return Excel file containing identification number, name, and revenue for each person
     */
    @GetMapping("/statistics/export/excel")
    public ResponseEntity<byte[]> exportStatisticsExcel() throws Exception {
        byte[] excel = excelService.generateStatisticsExcel(personService.getPersonStatistics());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=statistiky.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excel);
    }

}
