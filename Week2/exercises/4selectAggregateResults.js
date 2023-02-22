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

//All research papers and the number of authors that wrote that paper.
const getPapersAndAuthorsCount = () => {
        const sql = `
        SELECT research_papers.paper_title, COUNT(authors.author_id) as authors_count
        FROM research_papers
        JOIN authors ON research_papers.author_id = authors.author_id
        GROUP BY research_papers.paper_title
        `;

      connection.query(sql, function (error, results, fields) {
          if (error) throw error;
            console.log("Authors and all research papers:");
            results.forEach((result) => {
              console.log(`${result.paper_title} - : ${result.authors_count}`);
            });
          });
    }

//Sum of the research papers published by all female authors.    
const getFemaleAuthorsPaperSum = () => {
      const sql = `
      SELECT COUNT(research_papers.paper_id) as paper_sum
      FROM research_papers
      JOIN authors ON research_papers.author_id = authors.author_id
      WHERE authors.gender = 'Female'
          `;
      connection.query(sql, function (error, results, fields) {
          if (error) throw error;
            console.log("Sum of the research papers published by all female authors:", results[0].paper_sum);
            });
    }

//Average of the h-index of all authors per university.    
const getAverageHIndexPerUniversity = () => {
        const sql = `
        SELECT authors.university, AVG(authors.h_index) as avg_h_index
        FROM authors
        GROUP BY authors.university
        `;

      connection.query(sql, function (error, results, fields) {
          if (error) throw error;
            console.log("Average of the h-index per university:");
            results.forEach((result) => {
              console.log(`${result.university} - ${result.avg_h_index}`);
            });
          });
  } 

//Sum of the research papers of the authors per university.
const getResearchPaperSumPerUniversity = () => {
        const sql = `
        SELECT authors.university, COUNT(research_papers.paper_id) as paper_sum
        FROM authors
        JOIN research_papers ON authors.author_id = research_papers.author_id
        GROUP BY authors.university
        `;

      connection.query(sql, function (error, results, fields) {
          if (error) throw error;
            console.log("Sum of the research papers of the authors per university:");
            results.forEach((result) => {
              console.log(`${result.university} - ${result.paper_sum}`);
            });
          });
    }
  
//Minimum and maximum of the h-index of all authors per university.    
const getMinMaxHIndexPerUniversity = () => {
        const sql = `
        SELECT authors.university, MIN(authors.h_index) as min_h_index, MAX(authors.h_index) as max_h_index
        FROM authors
        GROUP BY authors.university
        `;

      connection.query(sql, function (error, results, fields) {
          if (error) throw error;
            console.log("Minimum and maximum of the h-index of all authors per university.:");
            results.forEach((result) => {
              console.log(`${result.university} - Min: ${result.min_h_index} - Max: ${result.max_h_index}`);
            });
          });
    }
    
//call the functions to execute the queries
  getPapersAndAuthorsCount();
  getFemaleAuthorsPaperSum();
  getAverageHIndexPerUniversity();
  getResearchPaperSumPerUniversity();
  getMinMaxHIndexPerUniversity();  
    
connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");});
