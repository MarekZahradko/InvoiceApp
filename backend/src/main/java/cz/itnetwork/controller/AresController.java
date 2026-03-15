package cz.itnetwork.controller;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.service.AresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for ARES (Czech business registry) lookups.
 * Provides company data pre-filling based on IČO.
 */
@RestController
@RequestMapping("/api/ares")
public class AresController {

    @Autowired
    private AresService aresService;

    /**
     * Looks up a company in the ARES registry by IČO.
     * Returns pre-filled person data that can be used to auto-fill the person form.
     *
     * @param ico 8-digit company identification number
     * @return PersonDTO with fields pre-filled from ARES
     */
    @GetMapping("/{ico}")
    public PersonDTO lookupByIco(@PathVariable String ico) {
        return aresService.lookupByIco(ico);
    }
}
