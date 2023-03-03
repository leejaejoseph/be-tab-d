export default function organizedData(data) {
  const tables = [];
  for (let i = 0; i < data[0].length; i++) {
    const table = [];
    const teacherPrimary = data[0][i].teacherId;
    table.push([data[0][i]]);
    const courseTable = [];
    const studentTable = [];
    for (let j = 0; j < data[1].length; j++) {
      if (data[1][j].teacherId === teacherPrimary) {
        courseTable.push(data[1][j]);
        const coursePrimary = data[1][j].courseId;
        for (let k = 0; k < data[2].length; k++) {
          if (data[2][k].courseId === coursePrimary) {
            studentTable.push(data[2][k]);
          }
        }
      }
    }
    table.push(courseTable);
    table.push(studentTable);
    tables.push(table);
  }
  return tables;
}
