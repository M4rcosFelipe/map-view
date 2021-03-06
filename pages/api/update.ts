// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import GoogleSpreadsheetsService from "../../services/GoogleSpreadsheetsService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { searchData, updateData ,user} = JSON.parse(req.body);
  const { searchValue, searchColumn } = searchData;


  const row = await GoogleSpreadsheetsService.getRowNumberByUniqueValue(
    searchValue,
    searchColumn
  );

  const column = await GoogleSpreadsheetsService.getColumnLetter(
    updateData.column
  );

  const guildColumn =  await GoogleSpreadsheetsService.getColumnLetter(
    "Associação"
  );
const userGuild = JSON.parse(user).guild;
  console.log(user)
await updateGuild(guildColumn,row,userGuild)


  const cell = `${column}${row}`;
  const formatedresponse = formatResponse(updateData.value);
  const result = await GoogleSpreadsheetsService.updateCell(
    cell,
    formatedresponse
  );
  const { status, data } = result;
  res.status(status);
  res.send(data);
}

function formatResponse(data: any[]) {
  const lideres = data.map(lider).filter(Boolean).toString();
  const contatos = data.map(contato).filter(Boolean).toString();
  if (lideres == "" && contatos == "") {
    return "";
  }
  return `=SPLIT("${lideres};${contatos}";";")`;
}

function contato(item: any) {
  return item.contato;
}

function lider(item: any) {
  return item.lider;
}

async function updateGuild(column:number,row:any,guildName:string){

  const guildCell = `${column}${row}`
await GoogleSpreadsheetsService.updateCell(
    guildCell,
    guildName
  );

}
