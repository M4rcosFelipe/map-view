// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import MarkersService from "../../services/markersService";

type Data = {
  name: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    cell,
    data: { selectValue, inputValues },
  } = JSON.parse(req.body);
  selectValue;
  const row = await MarkersService.getRowNumberByUniqueValue(
    selectValue,
    "address"
  );
  const cellValue = `${cell}${row}`;
  "cellValue", cellValue;
  "value", inputValues;
  await MarkersService.updateCell(cellValue, inputValues);
  res.status(200);
  return;
}
