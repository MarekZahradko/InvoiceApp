package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;

import java.util.List;

/** Service interface defining the business operations for invoice management. */
public interface InvoiceService {

    /**
     * Creates a new invoice.
     *
     * @param invoiceDTO invoice data
     * @return the created invoice
     */
    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    /**
     * Returns a filtered list of invoices.
     *
     * @param filter optional filter criteria
     * @return list of matching invoices
     */
    List<InvoiceDTO> getAllInvoices(InvoiceFilter filter);

    /**
     * Updates an existing invoice.
     *
     * @param invoiceNumber ID of the invoice to update
     * @param invoiceDTO    new invoice data
     * @return the updated invoice
     */
    InvoiceDTO editInvoice(Long invoiceNumber, InvoiceDTO invoiceDTO);

    /**
     * Returns the detail of a single invoice.
     *
     * @param invoiceId ID of the invoice
     * @return invoice detail
     */
    InvoiceDTO getInvoiceDetail(Long invoiceId);

    /**
     * Deletes an invoice by ID.
     *
     * @param invoiceId ID of the invoice to delete
     */
    void deleteInvoice(Long invoiceId);

    /**
     * Returns all invoices issued by a seller with the given identification number.
     *
     * @param identificationNumber seller's business identification number
     * @return list of invoices
     */
    List<InvoiceDTO> getInvoicesBySeller(String identificationNumber);

    /**
     * Returns all invoices received by a buyer with the given identification number.
     *
     * @param identificationNumber buyer's business identification number
     * @return list of invoices
     */
    List<InvoiceDTO> getInvoicesByBuyer(String identificationNumber);

    /**
     * Returns aggregate statistics: current year sum, all-time sum, and total invoice count.
     *
     * @return invoice statistics
     */
    InvoiceStatisticsDTO getInvoiceStatistics();
}