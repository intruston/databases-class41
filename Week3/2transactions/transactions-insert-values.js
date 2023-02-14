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

  const accountData = [
    ['NL101', 1050],
    ['NL102', 600],
    ['NL103', 7000],
    ['NL104', 888],
    ['NL105', 90000]
  ];

  const accountChangesData = [
    ['NL101', 300, '2022-02-01 10:00:00', 'Deposit'],
    ['NL102', -222, '2022-02-03 12:00:00', 'Withdrawal'],
    ['NL103', 300, '2022-02-13 14:00:00', 'Deposit'],
    ['NL104', 800, '2022-02-13 16:00:00', 'Deposit'],
    ['NL105', -10000, '2022-02-13 18:00:00', 'Withdrawal']
  ];

  const insertAccountData = `
    INSERT INTO account (account_number, balance)
    VALUES ?
  `;

  const insertAccountChangesData = `
    INSERT INTO account_changes (account_number, amount, changed_date, remark)
    VALUES ?
  `;

  connection.query(insertAccountData, [accountData], function(err, result) {
    if (err) throw err;
    console.log('Sample data inserted into account table');
  });

  connection.query(insertAccountChangesData, [accountChangesData], function(err, result) {
    if (err) throw err;
    console.log('Sample data inserted into account_changes table');
  });

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");});
