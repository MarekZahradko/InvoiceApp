
package cz.itnetwork.controller;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for person (business entity) management.
 * Handles CRUD operations and provides a statistics endpoint.
 */
@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    private PersonService personService;

    /**
     * Creates a new person (business entity).
     *
     * @param personDTO person data from the request body
     * @return the newly created person
     */
    @PostMapping("/persons")
    public PersonDTO addPerson(@RequestBody PersonDTO personDTO) {
        return  personService.addPerson(personDTO);
    }

    /**
     * Returns all non-hidden persons.
     *
     * @return list of active persons
     */
    @GetMapping("/persons")
    public List<PersonDTO> getPersons() {
        return personService.getAll();
    }

    /**
     * Soft-deletes a person by setting their hidden flag to true.
     *
     * @param personId ID of the person to delete
     */
    @DeleteMapping("/persons/{personId}")
    public void deletePerson(@PathVariable Long personId) {
        personService.removePerson(personId);
    }

    /**
     * Returns the detail of a single person.
     *
     * @param personId ID of the person to fetch
     * @return person detail
     */
    @GetMapping("/persons/{personId}")
    public PersonDTO getPersonDetail (@PathVariable Long personId) {
        return personService.getPersonDetail(personId);
    }

    /**
     * Updates an existing person.
     *
     * @param personId ID of the person to update
     * @param personDTO new person data
     * @return updated person
     */
    @PutMapping("/persons/{personId}")
    public PersonDTO editPerson(@PathVariable Long personId,@RequestBody PersonDTO personDTO) {
        return personService.editPerson(personId ,personDTO);
    }

    /**
     * Returns revenue statistics for each person (total revenue as seller).
     *
     * @return list of person statistics
     */
    @GetMapping("/persons/statistics")
    public List<PersonStatisticsDTO> getPersonStatistics() {
        return personService.getPersonStatistics();
    }

}

