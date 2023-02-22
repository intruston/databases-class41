const mysql = require('mysql');
const { config, startConnection, endConnection } = require('./connection.js');

startConnection();

const sql = `CREATE TABLE authors (
  author_id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  university VARCHAR(255),
  date_of_birth DATE,
  h_index INT,
  gender ENUM('male', 'female', 'other')
)`;

config.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Table created successfully!');
});

endConnection();
