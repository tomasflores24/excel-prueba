import ExcelJS from 'exceljs';
import { removeWhitespace } from '../utils';

export const getSheet = async () => {
  const workBook = new ExcelJS.Workbook();
  await workBook.xlsx.readFile(`${__dirname}/../../example.xlsx`);
  const hoja = workBook.getWorksheet(1);
  if (!hoja) throw new Error('No se encontró la hoja');
  return hoja;
};

export const readProperties = async (sheet: ExcelJS.Worksheet) => {
  const user: any = {};
  const dataColumns: any = {};

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell, colNumber) => {
        if (cell.value) {
          const value = cell.value.toString();
          const formatValue = removeWhitespace(value);
          user[formatValue] = null;
          dataColumns[formatValue] = colNumber;
        }
      });
    }
  });
  console.log({ dataColumns });

  return { user, dataColumns };
};

export const readData = async (sheet: ExcelJS.Worksheet, dataColumns: any) => {
  const users: any[] = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      let newUser: any = {};
      row.eachCell((cell, colNumber) => {
        // for (const propiedad in dataColumns) {
        //   if (colNumber === dataColumns[propiedad]) {
        //     newUser[propiedad] = cell.value;
        //   }
        // }
        // * -----
        const propiedad = Object.keys(dataColumns).find(
          (key) => dataColumns[key] === colNumber
        );

        if (propiedad) {
          newUser[propiedad] = cell.value;
        }
      });
      users.push(newUser);
      newUser = {};
    }
  });
  console.log(users);
};
