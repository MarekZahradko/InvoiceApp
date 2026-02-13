package cz.itnetwork.entity.repository;

import cz.itnetwork.entity.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long>, JpaSpecificationExecutor<InvoiceEntity> {

    List<InvoiceEntity> findBySellerIdentificationNumber(String identificationNumber);

    List<InvoiceEntity> findByBuyerIdentificationNumber(String identificationNumber);

    @Query("SELECT COALESCE(SUM(i.price), 0) FROM InvoiceEntity i WHERE YEAR(i.issued) = YEAR(CURRENT_DATE)")
    BigDecimal getCurrentYearSum();

    @Query("SELECT COALESCE(SUM(i.price), 0) FROM InvoiceEntity i")
    BigDecimal getAllTimeSum();

    @Query("SELECT COUNT(i) FROM InvoiceEntity i")
    Long getInvoicesCount();

}
