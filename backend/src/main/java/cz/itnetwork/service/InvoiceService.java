package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;

import java.util.List;

public interface InvoiceService {

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    List<InvoiceDTO> getAllInvoices(InvoiceFilter filter);

    InvoiceDTO editInvoice(Long invoiceNumber, InvoiceDTO invoiceDTO);

    InvoiceDTO getInvoiceDetail(Long invoiceId);

    void deleteInvoice(Long invoiceId);

    List<InvoiceDTO> getInvoicesBySeller(String identificationNumber);

    List<InvoiceDTO> getInvoicesByBuyer(String identificationNumber);

    InvoiceStatisticsDTO getInvoiceStatistics();
}