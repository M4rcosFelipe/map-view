import { google } from "googleapis";
import { Marker } from "../interfaces";

class GoogleSpreadSheetService {
  async getSpreadSheet() {
    const auth = await google.auth.getClient({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: process.env.SPREADSHEET_SCOPES,
    });

    google.options({ auth });

    const spreadsheet = google.sheets({
      version: "v4",
    });

    return spreadsheet;
  }

  async getAllData(range: string = "Sheet 1") {
    const data = await this.getData(range);
    return this.assignData(data.data.values);
  }

  async getColumnLetter(columnName: string) {
    const headers = await this.getHeaders();
    const assignedHeaders = this.assignHeaders(headers);
    return assignedHeaders[columnName];
  }

  async getDataByColumnName(columnName: string) {
    const columnLetter = await this.getColumnLetter(columnName);
    const data = await this.getData(`${columnLetter}:${columnLetter}`);
    data.data.values?.shift();
    return data.data.values;
  }

  async getRowNumberByUniqueValue(value: any, columnName: any) {
    if (value == "") return;
    const columnItems = await this.getDataByColumnName(columnName);
    let columnIndex = columnItems?.findIndex((item: any) => item == value) || 0;
    columnIndex = columnIndex + 2;
    return columnIndex;
  }

  async getData(range: string) {
    const spreadsheet = await this.getSpreadSheet();
    const data = await spreadsheet.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: range,
    });
    return data;
  }
  async getHeaders() {
    const mainSheet = "1:1";

    const data = await this.getData(mainSheet);
    return data.data;
  }

  assignHeaders(data: any) {
    let alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    const values = data.values[0];

    let assignedHeaders: any = {};

    values.map((value: any, index: number) => {
      const columnLetter = alphabet[index];
      assignedHeaders[value] = columnLetter;
    });
    return assignedHeaders;
  }

  assignFields(header: any, fields: any[]) {
    const initialObject: any = {};
    fields.forEach((field: string, index: number) => {
      const key = header[index];
      const value = field;
      if (key == "lat" || key == "long") {
        initialObject[key] = Number(value);
      } else {
        initialObject[key] = value;
      }
    });
    return initialObject;
  }

  assignData(data: any) {
    const header = data.shift();

    const assignedData = data.map((fields: any) => {
      return this.assignFields(header, fields);
    });

    return assignedData;
  }

  async updateCell(cell: any, value: any) {
    const spreadsheet = await this.getSpreadSheet();

    const response = await spreadsheet.spreadsheets.values.update({
      spreadsheetId: "1-Umf8JNNfVGZtmdPIf4PU2a5E7wFJYdBg90aP9tv6qs",
      valueInputOption: "RAW",
      range: cell,
      requestBody: {
        majorDimension: "ROWS",
        range: cell,
        values: [[value]],
      },
    });
    return response;
  }
}

export default new GoogleSpreadSheetService();
