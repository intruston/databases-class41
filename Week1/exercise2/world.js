const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

// What are the names of countries with population greater than 8 million?
connection.query("SELECT Name FROM country WHERE Population > 8000000", (err, results) => {
if (err) throw err;
console.log("Countries with population greater than 8 million:")
results.forEach(result => console.log(result.Name));
});

// What are the names of countries that have “land” in their names?
connection.query("SELECT Name FROM country WHERE Name LIKE '%land%'", (err, results) => {
if (err) throw err;
console.log("Countries that have 'land' in their names:")
results.forEach(result => console.log(result.Name));
});

// What are the names of the cities with population in between 500,000 and 1 million?
connection.query("SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000", (err, results) => {
if (err) throw err;
console.log("Cities with population between 500,000 and 1 million:")
results.forEach(result => console.log(result.Name));
});

// What's the name of all the countries on the continent ‘Europe’?
connection.query("SELECT Name FROM country WHERE Continent = 'Europe'", (err, results) => {
if (err) throw err;
console.log("Countries on the continent Europe:")
results.forEach(result => console.log(result.Name));
});

// List all the countries in the descending order of their surface areas.
connection.query("SELECT Name FROM country ORDER BY SurfaceArea DESC", (err, results) => {
if (err) throw err;
console.log("Countries in descending order of their surface areas:")
results.forEach(result => console.log(result.Name));
});

// What are the names of all the cities in the Netherlands?
connection.query("SELECT Name FROM city WHERE CountryCode = (SELECT Code FROM country WHERE Name = 'Netherlands')", (err, results) => {
if (err) throw err;
console.log("Cities in the Netherlands:")
results.forEach(result => console.log(result.Name));
});

// What is the population of Rotterdam?
connection.query("SELECT Population FROM city WHERE Name = 'Rotterdam'", (err, results) => {
if (err) throw err;
console.log("Population of Rotterdam:", results[0].Population);
});

// What's the top 10 countries by Surface Area?
connection.query("SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10", (err, results) => {
if (err) throw err;
console.log("Top 10 countries by Surface Area:")
results.forEach(result => console.log(result.Name));
});

// What's the top 10 most populated cities?
connection.query("SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10", (err, results) => {
    if (err) throw err;
    console.log("Top 10 most populated cities:")
    results.forEach(result => console.log(result.Name));
    });

// What is the population number of the world?
connection.query("SELECT SUM(Population) as TotalPopulation FROM country", (err, results) => {
    if (err) throw err;
    console.log("Population of the world:", results[0].TotalPopulation);
});

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");
  });