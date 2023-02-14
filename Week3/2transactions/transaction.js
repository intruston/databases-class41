const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

const transferAmount = 1000;
const accountA = 'NL101';
const accountB = 'NL102';
const changed_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

connection.beginTransaction((err) => {
  if (err) throw err;
  console.log('Transaction started');

  connection.query(`SELECT balance FROM account WHERE account_number = '${accountA}'`, (err, result) => {

    if (result[0].balance < transferAmount) {
      connection.rollback(() => {
        throw new Error("Insufficient balance");
      });
    }

    connection.query(
      `UPDATE account SET balance = balance - ${transferAmount} WHERE account_number = '${accountA}'`,
      (err, result) => {
        if (err) {
          connection.rollback(() => {
            throw err;
          });
        }

        connection.query(
          `UPDATE account SET balance = balance + ${transferAmount} WHERE account_number = '${accountB}'`,
          (err, result) => {
            if (err) {
              connection.rollback(() => {
                throw err;
              });
            }

            const changeA = [accountA, -transferAmount, changed_date, 'Transfer to ' + accountB];
            const changeB = [accountB, transferAmount, changed_date, 'Received from ' + accountA];

            connection.query(
              `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES ?`,
              [[changeA, changeB]],
              (err, result) => {
                if (err) {
                  connection.rollback(() => {
                    throw err;
                  });
                }
                connection.commit(() => {
                  console.log('Transaction committed');
                  connection.end((err) => {
                    if (err) throw err;
                    console.log("Connection closed");
                  });
                });
              }
            );
          }
        );
      }
    );
  });
});