const mysql = require("mysql");

const config = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "userdb",
  });
  
const startConnection = () => config.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database");
  });

const doQuery = (sql, par, message) => config.query(sql, par, function (error, results) {
    if (error) throw error;
    console.log(message);
  });

const selectQuery = (sql, callback) => config.query(sql, (error, results, fields) => {
  if (error) throw error;
  callback(results);
});

const endConnection = () => config.end((err) => {
    if (err) throw err;
    console.log("Connection closed");
  });

module.exports = {startConnection, doQuery, selectQuery, endConnection};