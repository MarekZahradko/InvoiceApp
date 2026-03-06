
package cz.itnetwork.entity.repository;

import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Spring Data JPA repository for {@link PersonEntity}.
 */
public interface PersonRepository extends JpaRepository<PersonEntity, Long> {

    /** Returns all persons matching the given hidden flag (true = soft-deleted, false = active). */
    List<PersonEntity> findByHidden(boolean hidden);

    /**
     * Returns revenue statistics for every person as a seller.
     * Uses a LEFT JOIN so persons with no invoices are included with revenue = 0.
     */
    @Query("SELECT new cz.itnetwork.dto.PersonStatisticsDTO(p.id, p.name, COALESCE(SUM(i.price), 0)) " +
           "FROM person p LEFT JOIN InvoiceEntity i ON i.seller.id = p.id " +
           "GROUP BY p.id, p.name")
    List<PersonStatisticsDTO> getPersonStatistics();

}
