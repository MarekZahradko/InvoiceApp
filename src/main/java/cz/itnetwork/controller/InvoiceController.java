package cz.itnetwork.controller;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/invoices")
    public ResponseEntity<InvoiceDTO> addInvoice(@RequestBody InvoiceDTO invoiceDTO){ // ResponseEntity for "created" code 201.
        InvoiceDTO created = invoiceService.addInvoice(invoiceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);

    }
    @GetMapping("/invoices")
    public List<InvoiceDTO> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }
    @PutMapping("/invoices/{invoiceId}")
    public InvoiceDTO editInvoice(@PathVariable Long invoiceId, @RequestBody InvoiceDTO invoiceDTO){
        return invoiceService.editInvoice(invoiceId, invoiceDTO);
    }
    @GetMapping("/invoices/{invoiceId}")
    public InvoiceDTO getInvoiceDetail(@PathVariable Long invoiceId){
        return invoiceService.getInvoiceDetail(invoiceId);
    }
    @DeleteMapping("/invoices/{invoiceId}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long invoiceId) {
        invoiceService.deleteInvoice(invoiceId);
        return ResponseEntity.noContent().build();
    }






}
