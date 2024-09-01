import * as ExcelJS from 'exceljs';

/**
 * Reads an Excel file and extracts labels and values from the first worksheet.
 *
 * @param {File} file - The Excel file to read.
 * @returns {Promise<Object>} An object containing `labels` and `values`.
 * @property {string[]} labels - Array of labels from the first column.
 * @property {number[]} values - Array of values from the second column.
 */
export const readExcelFile = async (file) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const firstWorksheet = workbook.worksheets[0];
    const labels = [];
    const values = [];

    firstWorksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        // Skip header
        if (rowNumber > 1) {
            labels.push(row.getCell(1).value); // X axis labels from 1st column
            values.push(row.getCell(2).value); // Y axis values from 2nd column
        }
    });

    return { labels, values };
}
