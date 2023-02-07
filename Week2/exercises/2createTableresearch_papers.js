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

const sql = `CREATE TABLE research_papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255) NOT NULL,
    conference VARCHAR(255),
    publish_date DATE,
    author_id INT
  )`;

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Table created successfully!');
});

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");});
