const { startConnection, doQuery, endConnection } = require('./connection.js');

startConnection();

const sql = `CREATE TABLE author_paper (
  author_id INT,
  paper_id INT,
  PRIMARY KEY (author_id, paper_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
  )`;

doQuery(sql, null, 'Table created successfully!');

endConnection();
