package cz.itnetwork.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * JPA entity representing an invoice stored in the "invoices" table.
 */
@Entity
@Table ( name = "invoices")
@Getter
@Setter
public class InvoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer invoiceNumber;

    /** The person who issued (sold) this invoice. */
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private PersonEntity seller;

    /** The person who received (bought) this invoice. */
    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private PersonEntity buyer;

    /** Date the invoice was issued. */
    @Column(nullable = false)
    private LocalDate issued;

    /** Date by which the invoice must be paid. */
    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private String product;

    @Column(nullable = false)
    private BigDecimal price;

    /** VAT rate in percent. */
    @Column(nullable = false)
    private Integer vat;

    @Column
    private String note;

    /**
     * Soft-delete flag. Hidden invoices are kept in the database
     * but excluded from normal listings.
     */
    @Column
    private boolean hidden = false;


}
