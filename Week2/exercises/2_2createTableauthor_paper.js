const mysql = require('mysql');
const { config, startConnection, endConnection } = require('./connection.js');

startConnection();

const sql = `CREATE TABLE author_paper (
  author_id INT,
  paper_id INT,
  PRIMARY KEY (author_id, paper_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
  )`;

config.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Table created successfully!');
}); 

endConnection();
