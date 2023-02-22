const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database");});

const sql = `ALTER TABLE authors ADD mentor INT, ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);`;

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Add mentor and foreign key');
});

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");});
