const { startConnection, selectQuery, endConnection } = require('./connection.js');

startConnection();

// All research papers and the number of authors that wrote that paper.
const getPapersAndAuthorsCount = () => {
  const sql = `SELECT research_papers.paper_title, COUNT(author_paper.author_id) as authors_count 
  FROM research_papers 
  LEFT JOIN author_paper ON research_papers.paper_id = author_paper.paper_id 
  GROUP BY research_papers.paper_id
  `;
  selectQuery(sql, (results) => {
    console.log("All research papers and the number of authors:");
    results.forEach((result) => {
      console.log(`${result.paper_title} - : ${result.authors_count}`);
    });
  });
};

// Sum of the research papers published by all female authors.
const getFemaleAuthorsPaperSum = () => {
  const sql = `SELECT COUNT(research_papers.paper_id) as paper_sum
  FROM research_papers
  JOIN author_paper ON research_papers.paper_id = author_paper.paper_id
  JOIN authors ON author_paper.author_id = authors.author_id
  WHERE authors.gender = 'Female'
  `;
  selectQuery(sql, (results) => {
    console.log(
      "Sum of the research papers published by all female authors:",
      results[0].paper_sum
    );
  });
};

// Average of the h-index of all authors per university.
const getAverageHIndexPerUniversity = () => {
  const sql = `SELECT authors.university, AVG(authors.h_index) as avg_h_index 
  FROM authors 
  GROUP BY authors.university
  `;
  selectQuery(sql, (results) => {
    console.log("Average of the h-index per university:");
    results.forEach((result) => {
      console.log(`${result.university} - ${result.avg_h_index}`);
    });
  });
};

// Sum of the research papers of the authors per university.
const getResearchPaperSumPerUniversity = () => {
  const sql = `SELECT authors.university, COUNT(author_paper.paper_id) as paper_sum 
  FROM authors 
  LEFT JOIN author_paper ON authors.author_id = author_paper.author_id 
  GROUP BY authors.university
  `;
  selectQuery(sql, (results) => {
    console.log("Sum of the research papers of the authors per university:");
    results.forEach((result) => {
      console.log(`${result.university} - ${result.paper_sum}`);
    });
  });
};

// Minimum and maximum of the h-index of all authors per university.
const getMinMaxHIndexPerUniversity = () => {
  const sql = `SELECT authors.university, MIN(authors.h_index) as min_h_index, MAX(authors.h_index) as max_h_index 
  FROM authors 
  GROUP BY authors.university`;
  selectQuery(sql, (results) => {
    console.log("Minimum and maximum of the h-index of all authors per university:");
    results.forEach((result) => {
      console.log(
        `${result.university} - Min: ${result.min_h_index} - Max: ${result.max_h_index}`
      );
    });
  });
};

//call the functions to execute the queries
getPapersAndAuthorsCount();
getFemaleAuthorsPaperSum();
getAverageHIndexPerUniversity();
getResearchPaperSumPerUniversity();
getMinMaxHIndexPerUniversity();

endConnection();
