const mysql = require('mysql');
const data = require('./data.json');
const { config, startConnection, endConnection } = require('./connection.js');

startConnection();

data.authors.forEach(author => {
    config.query('INSERT INTO authors SET ?', author, function (error, results) {
      if (error) throw error;
      console.log(`Author ${author.author_name} added!`);
    });
  });
  
data.research_papers.forEach(paper => {
    config.query('INSERT INTO research_papers SET ?', paper, function (error, results) {
      if (error) throw error;
      console.log(`Research paper ${paper.paper_title} added!`);
    });
  });

data.author_paper.forEach((authorPaper) => {
    config.query('INSERT INTO author_paper SET ?', authorPaper, function (error, results, fields) {
        if (error) throw error;
        console.log(`Author ${authorPaper.author_id} linked to paper ${authorPaper.paper_id}`);
    });
});

data.authorMentors.forEach((authorMentor) => {
    const sql = `UPDATE authors SET mentor = ${authorMentor.mentor_id} WHERE author_id = ${authorMentor.author_id}`;
    config.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(`Mentor ${authorMentor.mentor_id} added to author ${authorMentor.author_id}`);
    });
});

endConnection();
