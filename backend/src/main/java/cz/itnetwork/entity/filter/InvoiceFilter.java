package cz.itnetwork.entity.filter;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class InvoiceFilter {

    private Long buyerID;

    private Long sellerID;

    private String product;

    private BigDecimal minPrice;

    private BigDecimal maxPrice;

    private Integer limit;

}
