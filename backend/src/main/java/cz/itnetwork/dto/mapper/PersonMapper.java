
package cz.itnetwork.dto.mapper;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.entity.PersonEntity;
import org.mapstruct.Mapper;


/**
 * MapStruct mapper for converting between {@link PersonEntity} and {@link PersonDTO}.
 */
@Mapper(componentModel = "spring")
public interface PersonMapper {

    /** Converts a {@link PersonDTO} to its JPA entity representation. */
    PersonEntity toEntity(PersonDTO source);

    /** Converts a {@link PersonEntity} to its DTO representation. */
    PersonDTO toDTO(PersonEntity source);
}
