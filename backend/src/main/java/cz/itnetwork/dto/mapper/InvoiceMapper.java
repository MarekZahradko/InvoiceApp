package cz.itnetwork.dto.mapper;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.InvoiceEntity;
import org.mapstruct.Mapper;

/**
 * MapStruct mapper for converting between {@link InvoiceEntity} and {@link InvoiceDTO}.
 * Delegates person mapping to {@link PersonMapper}.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class})
public interface InvoiceMapper {
    /** Converts an {@link InvoiceDTO} to its JPA entity representation. */
    InvoiceEntity toEntity(InvoiceDTO source);

    /** Converts an {@link InvoiceEntity} to its DTO representation. */
    InvoiceDTO toDTO(InvoiceEntity source);

}
