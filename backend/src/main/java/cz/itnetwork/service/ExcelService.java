package cz.itnetwork.service;

import cz.itnetwork.dto.PersonStatisticsDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

/** Service responsible for generating Excel (.xlsx) exports using Apache POI. */
@Service
public class ExcelService {

    /**
     * Generates an Excel file containing revenue statistics for all persons.
     *
     * @param personStats list of person statistics to export
     * @return Excel file as a byte array
     */
    public byte[] generateStatisticsExcel(List<PersonStatisticsDTO> personStats) throws Exception {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Tržby osob");

        // Write header row
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("IČO");
        header.createCell(1).setCellValue("Název");
        header.createCell(2).setCellValue("Tržby (Kč)");

        // Write one data row per person
        for (int i = 0; i < personStats.size(); i++) {
            PersonStatisticsDTO person = personStats.get(i);
            Row row = sheet.createRow(i + 1);
            row.createCell(0).setCellValue(person.getIdentificationNumber());
            row.createCell(1).setCellValue(person.getPersonName());
            row.createCell(2).setCellValue(person.getRevenue().doubleValue());
        }

        // Serialize workbook to byte array and release resources
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        workbook.close();
        return baos.toByteArray();
    }
}