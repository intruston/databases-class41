const { startConnection, doQuery, endConnection } = require('./connection.js');

startConnection();

const sql = `ALTER TABLE authors ADD mentor INT, ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);`;

doQuery(sql, null, 'Add mentor and foreign key')

endConnection();
