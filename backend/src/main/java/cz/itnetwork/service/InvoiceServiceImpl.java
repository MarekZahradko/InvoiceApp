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

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PersonRepository personRepository;

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

    @Override
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter filter) {
        InvoiceSpecification specification = new InvoiceSpecification(filter);

        List<InvoiceEntity> invoices;
        if (filter.getLimit() != null) {
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
        invoice.setId(invoiceId);
        InvoiceEntity saved = invoiceRepository.save(invoice);

        return invoiceMapper.toDTO(saved);

    }

    @Override
    public InvoiceDTO getInvoiceDetail(Long invoiceId) {
        InvoiceEntity invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new NotFoundException("Invoice not found"));
        return invoiceMapper.toDTO(invoice);

    }

    @Override
    public void deleteInvoice(Long invoiceId) {
        invoiceRepository.deleteById(invoiceId);
    }

    @Override
    public List<InvoiceDTO> getInvoicesBySeller(String identificationNumber) {
        List<InvoiceDTO> result = new ArrayList<>();
        for (InvoiceEntity invoice : invoiceRepository.findBySellerIdentificationNumber(identificationNumber)) {
            result.add(invoiceMapper.toDTO(invoice));
        }
        return result;
    }

    @Override
    public List<InvoiceDTO> getInvoicesByBuyer(String identificationNumber) {
        List<InvoiceDTO> result = new ArrayList<>();
        for (InvoiceEntity invoice : invoiceRepository.findByBuyerIdentificationNumber(identificationNumber)) {
            result.add(invoiceMapper.toDTO(invoice));
        }
        return result;
    }

    @Override
    public InvoiceStatisticsDTO getInvoiceStatistics() {
        InvoiceStatisticsDTO statistics = new InvoiceStatisticsDTO();
        statistics.setCurrentYearSum(invoiceRepository.getCurrentYearSum());
        statistics.setAllTimeSum(invoiceRepository.getAllTimeSum());
        statistics.setInvoicesCount(invoiceRepository.getInvoicesCount());
        return statistics;
    }

}
