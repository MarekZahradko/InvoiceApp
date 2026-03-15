package cz.itnetwork.service;

import cz.itnetwork.dto.PersonDTO;

public interface AresService {

    /**
     * Looks up a company in the ARES registry by IČO and returns pre-filled person data.
     *
     * @param ico 8-digit company identification number
     * @return PersonDTO with fields pre-filled from ARES
     */
    PersonDTO lookupByIco(String ico);
}
