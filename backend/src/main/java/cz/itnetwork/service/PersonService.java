package cz.itnetwork.service;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;

import java.util.List;

public interface PersonService {

    /**
     * Creates a new person
     *
     * @param personDTO Person to create
     * @return newly created person
     */
    PersonDTO addPerson(PersonDTO personDTO);

    /**
     * <p>Sets hidden flag to true for the person with the matching [id]</p>
     * <p>In case a person with the passed [id] isn't found, the method <b>silently fails</b></p>
     *
     * @param id Person to delete
     */
    void removePerson(long id);

    /**
     * Fetches all non-hidden persons
     *
     * @return List of all non-hidden persons
     */
    List<PersonDTO> getAll();

    /**
     * Returns the detail of a single person.
     *
     * @param personId ID of the person to fetch
     * @return person detail
     */
    PersonDTO getPersonDetail(Long personId);

    /**
     * Updates an existing person.
     *
     * @param personId  ID of the person to update
     * @param personDTO new person data
     * @return updated person
     */
    PersonDTO editPerson(Long personId, PersonDTO personDTO);

    /**
     * Returns revenue statistics for each person (total revenue as seller).
     *
     * @return list of person statistics
     */
    List<PersonStatisticsDTO> getPersonStatistics();

}
