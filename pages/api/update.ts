// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import GoogleSpreadsheetsService from "../../services/GoogleSpreadsheetsService";

type Data = {
  name: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { searchData, updateData } = JSON.parse(req.body);
  const { searchValue, searchColumn } = searchData;

  const row = await GoogleSpreadsheetsService.getRowNumberByUniqueValue(
    searchValue,
    searchColumn
  );

  const column = await GoogleSpreadsheetsService.getColumnLetter(
    updateData.column
  );

  const cell = `${column}${row}`;
  const data = formatResponse(updateData.value);
  await GoogleSpreadsheetsService.updateCell(cell, data);
  res.status(200);
  return;
}

function cleanResponse(data: string) {
  const cleanData = data.replace(/[-&\/\\^$*+?.()|[\]{}\"]/g, "");
  return cleanData;
}

function formatResponse(data: any[]) {
  const formatedData = data.map((item: any) => {
    const { lider, contato } = item;
    return { [lider]: contato };
  });
  const formatedResponse = cleanResponse(JSON.stringify(formatedData)).replace(
    /,/g,
    "&CHAR(10)"
  );

  return formatedResponse;
}
