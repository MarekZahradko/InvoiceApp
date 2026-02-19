package cz.itnetwork.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonStatisticsDTO {

    @JsonProperty("personId")
    private Long personId;

    @JsonProperty("personName")
    private String personName;

    private BigDecimal revenue;

}
