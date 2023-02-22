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

const endConnection = () => config.end((err) => {
    if (err) throw err;
    console.log("Connection closed");
  });

module.exports = {config, startConnection, endConnection};