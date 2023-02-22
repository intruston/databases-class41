const mysql = require("mysql");
const { config, startConnection, endConnection } = require('./connection.js');

startConnection();

// Write a query that prints names of all authors and their corresponding mentors.
const printAuthorsAndMentors = () => {
  const sql = `
        SELECT authors.author_name, mentor.author_name as mentor_name
        FROM authors
        LEFT JOIN authors as mentor ON authors.mentor = mentor.author_id;
        `;

  config.query(sql, function (error, results, fields) {
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
    SELECT authors.*, research_papers.paper_title
    FROM authors
    LEFT JOIN author_paper ON authors.author_id = author_paper.author_id
    LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id;
  `;

  config.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log("Authors and their published papers:");
    results.forEach((result) => {
      console.log(`Author: ${result.author_name}`);
      console.log(`University: ${result.university}`);
      console.log(`Date of Birth: ${result.date_of_birth}`);
      console.log(`H-Index: ${result.h_index}`);
      console.log(`Gender: ${result.gender}`);
      console.log(`Paper: ${result.paper_title || "No papers found for this author"}`);
    });
  });
};

printAuthorsAndMentors();
printAuthorsAndPapers();

endConnection();
