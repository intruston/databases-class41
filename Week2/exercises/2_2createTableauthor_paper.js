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

const sql = `CREATE TABLE author_paper (
  author_id INT,
  paper_id INT,
  PRIMARY KEY (author_id, paper_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
  )`;

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Table created successfully!');
}); 

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");});
