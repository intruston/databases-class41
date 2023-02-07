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

// Write a query that prints names of all authors and their corresponding mentors.
const printAuthorsAndMentors = () => {
    const sql = `
        SELECT authors.author_name, mentor.author_name as mentor_name
        FROM authors
        LEFT JOIN authors as mentor ON authors.mentor = mentor.author_id;
        `;

    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
          console.log("Authors and their mentors:");
          results.forEach((result) => {
            console.log(`${result.author_name} - Mentor: ${result.mentor_name}`);
          });
        });
};

//Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.
const printAuthorsAndPapers = () => {
    const sql = `
      SELECT authors.*, research_Papers.paper_title
      FROM authors
      LEFT JOIN research_Papers ON authors.author_id = research_Papers.author_id;
    `;
  
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log("Authors and their published papers:");
      results.forEach((result) => {
        console.log(`Author: ${result.author_name}`);
        console.log(`University: ${result.university}`);
        console.log(`Date of Birth: ${result.date_of_birth}`);
        console.log(`H-Index: ${result.h_index}`);
        console.log(`Gender: ${result.gender}`);
        console.log(`Paper: ${result.paper_title || "Not found"}`);
      });
    });
  };
 
printAuthorsAndMentors(); 
printAuthorsAndPapers();

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");});
