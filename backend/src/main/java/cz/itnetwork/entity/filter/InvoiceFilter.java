package cz.itnetwork.entity.filter;

import lombok.Data;

import java.math.BigDecimal;

/**
 * Filter criteria for querying invoices.
 * All fields are optional; only non-null values are applied as query conditions.
 */
@Data
public class InvoiceFilter {

    /** Filter by buyer's database ID. */
    private Long buyerID;

    /** Filter by seller's database ID. */
    private Long sellerID;

    /** Filter by product name (partial match). */
    private String product;

    /** Filter invoices with price greater than or equal to this value. */
    private BigDecimal minPrice;

    /** Filter invoices with price less than or equal to this value. */
    private BigDecimal maxPrice;

    /** Maximum number of results to return. */
    private Integer limit;

}
