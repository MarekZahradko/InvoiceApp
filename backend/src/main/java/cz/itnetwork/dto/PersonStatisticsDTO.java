package cz.itnetwork.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Data Transfer Object carrying revenue statistics for a single person (as seller).
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonStatisticsDTO {

    @JsonProperty("personId")
    private Long personId;

    @JsonProperty("personName")
    private String personName;

    /** Total revenue earned by this person as a seller across all invoices. */
    private BigDecimal revenue;

}
