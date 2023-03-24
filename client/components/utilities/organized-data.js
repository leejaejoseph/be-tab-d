/**
 * Whilst this function is set to take hardcoded keys along with the schema.sql
 * set with primary keys, this function is the main function updated to actually
 * display csv tables into relations by automatically grabbing key.
 *
 * In terms of functionality, the table grabs the teacherId as its main primary
 * key and looks to the second table or 'courses' and matches its teacherID to
 * course table. If the teacherId doesn't match, it goes next. Then to the final
 * tables which is the 'students' table, the courseId from courses is the foreign
 * key tying students into the whole relational table.
 * The tables are organized into arrays of teachers, courses, students under
 * different teacherIDs.
 */
export default function organizedData(data) {
  const tables = [];
  if (!data[0]) {
    return;
  }
  for (let i = 0; i < data[0].length; i++) {
    const table = [];
    const teacherPrimary = data[0][i].teacherId;
    table.push([data[0][i]]);
    const courseTable = [];
    const studentTable = [];
    if (data[1] !== undefined) {
      for (let j = 0; j < data[1].length; j++) {
        if (data[1][j].teacherId === teacherPrimary) {
          courseTable.push(data[1][j]);
          const coursePrimary = data[1][j].courseId;
          if (data[2] !== undefined) {
            for (let k = 0; k < data[2].length; k++) {
              if (data[2][k].courseId === coursePrimary) {
                studentTable.push(data[2][k]);
              }
            }
          }
        }
      }
    }
    if (courseTable.length > 0) {
      table.push(courseTable);
    }
    if (studentTable.length > 0) {
      table.push(studentTable);
    }
    tables.push(table);
  }
  return tables;
}
