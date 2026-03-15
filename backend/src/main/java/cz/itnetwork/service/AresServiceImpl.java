package cz.itnetwork.service;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.ares.AresResponseDto;
import cz.itnetwork.dto.ares.AresSidloDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

/** Default implementation of {@link AresService}. */
@Service
public class AresServiceImpl implements AresService {

    private static final String ARES_URL = "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/{ico}";

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Calls the ARES REST API with the given IČO and maps the response to a {@link PersonDTO}.
     *
     * @throws EntityNotFoundException if no company with the given IČO exists in ARES
     */
    @Override
    public PersonDTO lookupByIco(String ico) {
        AresResponseDto aresResponse;

        try {
            aresResponse = restTemplate.getForObject(ARES_URL, AresResponseDto.class, ico);
        } catch (HttpClientErrorException.NotFound e) {
            throw new EntityNotFoundException("IČO " + ico + " was not found in the ARES registry.");
        }

        if (aresResponse == null) {
            throw new EntityNotFoundException("ARES returned an empty response for IČO " + ico + ".");
        }

        return mapToPersonDTO(aresResponse);
    }

    /** Maps the ARES response fields to a {@link PersonDTO} used for form pre-filling. */
    private PersonDTO mapToPersonDTO(AresResponseDto ares) {
        PersonDTO dto = new PersonDTO();
        dto.setName(ares.getObchodniJmeno());
        dto.setIdentificationNumber(ares.getIco());
        dto.setTaxNumber(ares.getDic());

        AresSidloDto sidlo = ares.getSidlo();
        if (sidlo != null) {
            dto.setCity(sidlo.getNazevObce());
            dto.setZip(sidlo.getPsc() != null ? String.valueOf(sidlo.getPsc()) : null);
            dto.setStreet(buildStreet(sidlo));
        }

        return dto;
    }

    /**
     * Builds a single street string from the ARES address components.
     * Example: "Hlavní" + 5 + 3 → "Hlavní 5/3"
     */
    private String buildStreet(AresSidloDto sidlo) {
        if (sidlo.getNazevUlice() == null) {
            return null;
        }
        StringBuilder street = new StringBuilder(sidlo.getNazevUlice());
        if (sidlo.getCisloDomovni() != null) {
            street.append(" ").append(sidlo.getCisloDomovni());
        }
        if (sidlo.getCisloOrientacni() != null) {
            street.append("/").append(sidlo.getCisloOrientacni());
        }
        return street.toString();
    }
}
