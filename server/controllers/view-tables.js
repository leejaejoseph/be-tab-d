/**
 * ViewTables takes the params from index.js as queried by the client, destructuring
 * the request, result, and database. Taking the userId from the request, the function
 * is used to grab the tableType, fileId, and use the result to grab the individual
 * files with the same tableType and collect all the same tabletypes under one array.
 */

async function ViewTables(param) {
  const { req, res, db } = param;
  const { userId } = req.params;
  const params = [userId];
  const sql = `
          select "tableType", "fileId"
          from "files"
          where "userId" = $1
        `;
  const result = await db.query(sql, params);
  const tables = result.rows;
  const returnArray = [];
  for (const table of tables) {
    const param = [table.fileId];
    const sql = `
      select *
      from ${table.tableType}
      where "fileId" = $1
    `;
    const result = await db.query(sql, param);
    returnArray.push(result.rows);
  }
  res.status(200).json(returnArray);
}

module.exports = ViewTables;
