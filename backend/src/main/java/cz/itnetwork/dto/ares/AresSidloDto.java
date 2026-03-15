package cz.itnetwork.dto.ares;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents the "sidlo" (registered address) object from the ARES API response.
 */
@Data
@NoArgsConstructor
public class AresSidloDto {

    private String nazevUlice;

    private Integer cisloDomovni;

    private Integer cisloOrientacni;

    private Integer psc;

    private String nazevObce;

    private String nazevStatu;
}
