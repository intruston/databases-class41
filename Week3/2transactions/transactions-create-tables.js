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

  const accountTable = `
    CREATE TABLE account (
        account_number VARCHAR(255) PRIMARY KEY,
        balance DECIMAL(10,2) NOT NULL
    );
  `;

  const accountChangesTable = `
    CREATE TABLE account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        changed_date DATETIME NOT NULL,
        remark VARCHAR(255),
        FOREIGN KEY (account_number) REFERENCES account (account_number)
    );
  `;

  connection.query(accountTable, (err, result) => {
    if (err) throw err;
    console.log('Table account created');
  });

  connection.query(accountChangesTable, (err, result) => {
    if (err) throw err;
    console.log('Table account_changes created');
  });

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");});
