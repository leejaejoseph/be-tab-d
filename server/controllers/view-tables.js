async function ViewTables(param) {
  const { req, res, db } = param;
  const { userId } = req.params;
  const tableTypeAggregate = {};

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
    if (!tableTypeAggregate[table.tableType]) {
      tableTypeAggregate[table.tableType] = result.rows;
    } else {
      const previous = tableTypeAggregate[table.tableType];
      const combined = previous.concat(result.rows);
      tableTypeAggregate[table.tableType] = combined;
    }
  }
  for (const table in tableTypeAggregate) {
    returnArray.push(tableTypeAggregate[table]);
  }
  res.status(200).json(returnArray);
}

module.exports = ViewTables;
