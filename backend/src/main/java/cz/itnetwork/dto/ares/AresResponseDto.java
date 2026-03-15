package cz.itnetwork.dto.ares;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents the top-level response from the ARES API for a single economic entity lookup.
 * Only fields relevant to person/company form pre-filling are mapped.
 */
@Data
@NoArgsConstructor
public class AresResponseDto {

    private String ico;

    private String obchodniJmeno;

    private String dic;

    private AresSidloDto sidlo;
}
