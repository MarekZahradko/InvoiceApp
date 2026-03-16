package cz.itnetwork.service;


import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.mapper.PersonMapper;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.repository.PersonRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;


import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

// Enables Mockito annotations (@Mock, @InjectMocks) without loading the Spring context
@ExtendWith(MockitoExtension.class)
public class PersonServicesImplTest {

    // Creates a fake repository — no real database calls are made
    @Mock
    private PersonRepository personRepository;

    // Creates a fake mapper — no real mapping logic is executed
    @Mock
    private PersonMapper personMapper;

    // Creates the real service and injects the mocks above into it
    @InjectMocks
    private PersonServiceImpl personService;

    @Test
    void addPerson_shouldReturnMappedDTO() {
        // Arrange — prepare fake objects and define what mocks should return
        PersonDTO inputDTO = new PersonDTO();
        PersonEntity inputEntity = new PersonEntity();
        when(personMapper.toEntity(inputDTO)).thenReturn(inputEntity);   // mock: DTO → Entity
        when(personRepository.save(inputEntity)).thenReturn(inputEntity); // mock: save returns same entity
        PersonDTO expectedDTO = new PersonDTO();
        when(personMapper.toDTO(inputEntity)).thenReturn(expectedDTO);   // mock: Entity → DTO

        // Act — call the method under test
        PersonDTO result = personService.addPerson(inputDTO);

        // Assert — verify the result is what we expect
        assertThat(result).isEqualTo(expectedDTO);
        }

    @Test
    void removePerson_shouldSetHiddenTrue() {
        // Arrange — prepare a person that exists in the database
        PersonEntity inputEntity = new PersonEntity();
        when(personRepository.findById(1L)).thenReturn(Optional.of(inputEntity));

        // Act — call the method under test
        personService.removePerson(1L);

        // Assert — verify side effects: hidden flag set and entity saved
        assertThat(inputEntity.isHidden()).isTrue();
        verify(personRepository).save(inputEntity);
    }

    @Test
    void removePerson_whenPersonNotFound_ShouldNotThrow() {
        // Arrange — simulate missing person in the database
        when(personRepository.findById(1L)).thenReturn(Optional.empty());

        // Act — call the method under test
        personService.removePerson(1L);

        // Assert — no exception should be thrown, method silently ignores missing person
        assertThat(true).isTrue();
    }

    }

