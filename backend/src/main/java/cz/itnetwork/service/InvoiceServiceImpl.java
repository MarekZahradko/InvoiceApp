package cz.itnetwork.service;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.entity.filter.InvoiceSpecification;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.ArrayList;
import java.util.List;

/** Default implementation of {@link InvoiceService}. */
@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PersonRepository personRepository;

    /**
     * Creates a new invoice.
     * Fetches the seller and buyer entities by ID to ensure they exist before saving.
     */
    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        PersonEntity seller = personRepository.findById(invoiceDTO.getSeller().getId())
                .orElseThrow(() -> new NotFoundException("Seller not found"));
        PersonEntity buyer = personRepository.findById(invoiceDTO.getBuyer().getId())
                .orElseThrow(() -> new NotFoundException("Buyer not found"));

        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);
        entity.setSeller(seller);
        entity.setBuyer(buyer);
        entity = invoiceRepository.save(entity);

        return invoiceMapper.toDTO(entity);
    }

    /**
     * Returns invoices matching the given filter.
     * When a limit is set, pagination is applied to cap the result size.
     */
    @Override
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter filter) {
        InvoiceSpecification specification = new InvoiceSpecification(filter);

        List<InvoiceEntity> invoices;
        if (filter.getLimit() != null) {
            // Use pagination to enforce the result limit
            invoices = invoiceRepository.findAll(specification, PageRequest.of(0, filter.getLimit())).getContent();
        } else {
            invoices = invoiceRepository.findAll(specification);
        }

        List<InvoiceDTO> result = new ArrayList<>();
        for (InvoiceEntity invoice : invoices) {
            result.add(invoiceMapper.toDTO(invoice));
        }
        return result;
    }

    /**
     * Updates an existing invoice.
     * Verifies that the invoice, seller, and buyer all exist before saving.
     * The ID is explicitly set to prevent creating a new record.
     */
    @Override
    public InvoiceDTO editInvoice(Long invoiceId, InvoiceDTO invoiceDTO) {
        if (!invoiceRepository.existsById(invoiceId)) {
            throw new NotFoundException("Invoice not found");
        }
        PersonEntity seller = personRepository.findById(invoiceDTO.getSeller().getId())
                .orElseThrow(() -> new NotFoundException("Seller not found"));
        PersonEntity buyer = personRepository.findById(invoiceDTO.getBuyer().getId())
                .orElseThrow(() -> new NotFoundException("Buyer not found"));

        InvoiceEntity invoice = invoiceMapper.toEntity(invoiceDTO);
        invoice.setId(invoiceId); // Ensure we update the existing record, not create a new one
        InvoiceEntity saved = invoiceRepository.save(invoice);

        return invoiceMapper.toDTO(saved);
    }

    /** Returns the detail of a single invoice, or throws 404 if not found. */
    @Override
    public InvoiceDTO getInvoiceDetail(Long invoiceId) {
        InvoiceEntity invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new NotFoundException("Invoice not found"));
        return invoiceMapper.toDTO(invoice);
    }

    /** Permanently deletes an invoice by ID. */
    @Override
    public void deleteInvoice(Long invoiceId) {
        invoiceRepository.deleteById(invoiceId);
    }

    /** Returns all invoices where the seller matches the given identification number. */
    @Override
    public List<InvoiceDTO> getInvoicesBySeller(String identificationNumber) {
        List<InvoiceDTO> result = new ArrayList<>();
        for (InvoiceEntity invoice : invoiceRepository.findBySellerIdentificationNumber(identificationNumber)) {
            result.add(invoiceMapper.toDTO(invoice));
        }
        return result;
    }

    /** Returns all invoices where the buyer matches the given identification number. */
    @Override
    public List<InvoiceDTO> getInvoicesByBuyer(String identificationNumber) {
        List<InvoiceDTO> result = new ArrayList<>();
        for (InvoiceEntity invoice : invoiceRepository.findByBuyerIdentificationNumber(identificationNumber)) {
            result.add(invoiceMapper.toDTO(invoice));
        }
        return result;
    }

    /** Assembles and returns aggregate invoice statistics from dedicated repository queries. */
    @Override
    public InvoiceStatisticsDTO getInvoiceStatistics() {
        InvoiceStatisticsDTO statistics = new InvoiceStatisticsDTO();
        statistics.setCurrentYearSum(invoiceRepository.getCurrentYearSum());
        statistics.setAllTimeSum(invoiceRepository.getAllTimeSum());
        statistics.setInvoicesCount(invoiceRepository.getInvoicesCount());
        return statistics;
    }

}
