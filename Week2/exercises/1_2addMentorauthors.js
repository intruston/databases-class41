const mysql = require('mysql');
const { config, startConnection, endConnection } = require('./connection.js');

startConnection();

const sql = `ALTER TABLE authors ADD mentor INT, ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);`;

config.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Add mentor and foreign key');
});

endConnection();
