package cz.itnetwork.entity.repository;

import cz.itnetwork.entity.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

/**
 * Spring Data JPA repository for {@link InvoiceEntity}.
 * Extends {@link JpaSpecificationExecutor} to support dynamic filtering via {@link cz.itnetwork.entity.filter.InvoiceSpecification}.
 */
public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long>, JpaSpecificationExecutor<InvoiceEntity> {

    /** Returns all invoices where the seller's identification number matches. */
    List<InvoiceEntity> findBySellerIdentificationNumber(String identificationNumber);

    /** Returns all invoices where the buyer's identification number matches. */
    List<InvoiceEntity> findByBuyerIdentificationNumber(String identificationNumber);

    /** Returns the total sum of invoice prices issued in the current calendar year. Returns 0 if none exist. */
    @Query("SELECT COALESCE(SUM(i.price), 0) FROM InvoiceEntity i WHERE YEAR(i.issued) = YEAR(CURRENT_DATE)")
    BigDecimal getCurrentYearSum();

    /** Returns the total sum of all invoice prices across all time. Returns 0 if none exist. */
    @Query("SELECT COALESCE(SUM(i.price), 0) FROM InvoiceEntity i")
    BigDecimal getAllTimeSum();

    /** Returns the total number of invoices in the database. */
    @Query("SELECT COUNT(i) FROM InvoiceEntity i")
    Long getInvoicesCount();

}
