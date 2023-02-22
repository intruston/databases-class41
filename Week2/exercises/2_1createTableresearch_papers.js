const mysql = require('mysql');
const { config, startConnection, endConnection } = require('./connection.js');

startConnection();

const sql = `CREATE TABLE research_papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255) NOT NULL,
    conference VARCHAR(255),
    publish_date DATE
  )`;

config.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Table created successfully!');
});

endConnection();
