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

const sql = `CREATE TABLE authors (
  author_id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  university VARCHAR(255),
  date_of_birth DATE,
  h_index INT,
  gender ENUM('male', 'female', 'other')
)`;

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Table created successfully!');
});

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");});
