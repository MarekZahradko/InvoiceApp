package cz.itnetwork.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Data Transfer Object representing an invoice.
 * Used for both incoming requests and outgoing responses.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO {

    @JsonProperty("_id") // Serialized as "_id" to match the frontend convention
    private Long id;

    private Integer invoiceNumber;

    private PersonDTO seller;
    private PersonDTO buyer;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate issued;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    private String product;

    private BigDecimal price;

    /** VAT rate in percent. */
    private Integer vat;

    private String note;


}
