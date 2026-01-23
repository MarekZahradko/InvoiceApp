package cz.itnetwork.service;
import cz.itnetwork.dto.InvoiceDTO;

import java.util.List;

public interface InvoiceService {

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    List<InvoiceDTO> getAllInvoices();

    InvoiceDTO editInvoice(Long invoiceNumber, InvoiceDTO invoiceDTO);

    InvoiceDTO getInvoiceDetail(Long invoiceId);
}