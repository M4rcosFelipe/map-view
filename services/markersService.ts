import GoogleSpreadSheetService from "./GoogleSpreadsheetsService";
import { Marker } from "../interfaces";
export class MarkerService {
  async getAll(range: any = "Sheet 1") {
    return await GoogleSpreadSheetService.getAllData(range);
  }

  async getDataByColumnName(columnName: string) {
    return await GoogleSpreadSheetService.getDataByColumnName(columnName);
  }
  async getRowNumberByUniqueValue(value: any, columnName: string) {
    return await GoogleSpreadSheetService.getRowNumberByUniqueValue(
      value,
      columnName
    );
  }

  async updateCell(cell: any, value: any) {
    return await GoogleSpreadSheetService.updateCell(cell, value);
  }
}

export default new MarkerService();
