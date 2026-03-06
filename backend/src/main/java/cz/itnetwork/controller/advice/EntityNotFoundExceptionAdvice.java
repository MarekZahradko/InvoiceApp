package cz.itnetwork.controller.advice;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.webjars.NotFoundException;

/**
 * Global exception handler that maps entity-not-found exceptions to HTTP 404.
 * Catches both {@link org.webjars.NotFoundException} and {@link jakarta.persistence.EntityNotFoundException}.
 */
@ControllerAdvice
public class EntityNotFoundExceptionAdvice {

    /** Returns HTTP 404 Not Found whenever a requested entity does not exist. */
    @ExceptionHandler({NotFoundException.class, EntityNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleEntityNotFoundException() {
    }

}
