const mysql = require('mysql');

const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database");});

    function getPopulation(Country, name, code, cb) {
        conn.query(
          `SELECT Population FROM ${Country} WHERE Name = '${name}' and Code = '${code}'`,
          function (err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            result[0].name = result.map((num) => num.Population).join(', ');
            cb(null, result[0].name);
          }
        );
      };

    //To prevent SQL injection, the function should use parameterized queries instead of string concatenation.

      function getPopulationNoInjection(Country, name, code, cb) {
        conn.query(
          `SELECT Population FROM ${Country} WHERE Name = ? and Code = ?`,
          [name, code],
          function (err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error('Not found'));
            result[0].name = result.map((num) => num.Population).join(', ');
            cb(null, result[0].name);
          },
        );
      }

      //getPopulation('country', `Netherlands' OR '1'='1`, `NLD' or '1'='1`,console.log);
      //getPopulationNoInjection('country', `Netherlands' OR '1'='1`, `NLD' or '1'='1`,console.log);
      getPopulationNoInjection(`country`, `Netherlands`, `NLD`,console.log);

      conn.end((err) => {
        if (err) throw err;
        console.log("Connection closed");});