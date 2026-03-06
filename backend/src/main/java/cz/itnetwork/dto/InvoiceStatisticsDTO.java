package cz.itnetwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Data Transfer Object carrying aggregate invoice statistics.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceStatisticsDTO {

    /** Total sum of all invoice prices issued in the current calendar year. */
    private BigDecimal currentYearSum;

    /** Total sum of all invoice prices across all time. */
    private BigDecimal allTimeSum;

    /** Total number of invoices stored in the database. */
    private Long invoicesCount;

}
