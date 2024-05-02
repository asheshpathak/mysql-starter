const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// const result = pool.query("SELECT * FROM notes");
// const result2 = pool.query(
//   "INSERT INTO notes(title,contents) VALUES ('my third note','a note about something else')"
// );

async function getRowsWithID(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM notes
    WHERE id = ?
    `,
    [id]
  );

  return rows;
}

async function createNote(title, contents) {
  const rows = await pool.query(
    `
        INSERT INTO notes(title,contents)
        VALUES
        (?,?)
    
        `,
    [title, contents]
  );

  return rows;
}

// result.then(([data]) => {
//   console.log(data);
// });

// result2.then(data => {
//     console.log(data);
// });

// getRowsWithID(1).then((note) => {
//   console.log(note);
// });

createNote("my fifth note", "a fifth note about something").then((note) => {
  console.log(note);
});
