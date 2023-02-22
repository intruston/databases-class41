const mysql = require('mysql');
const data = require('./data.json');

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

data.authors.forEach(author => {
    connection.query('INSERT INTO authors SET ?', author, function (error, results) {
      if (error) throw error;
      console.log(`Author ${author.author_name} added!`);
    });
  });
  
data.research_papers.forEach(paper => {
    connection.query('INSERT INTO research_papers SET ?', paper, function (error, results) {
      if (error) throw error;
      console.log(`Research paper ${paper.paper_title} added!`);
    });
  });

data.author_paper.forEach((authorPaper) => {
    connection.query('INSERT INTO author_paper SET ?', authorPaper, function (error, results, fields) {
        if (error) throw error;
        console.log(`Author ${authorPaper.author_id} linked to paper ${authorPaper.paper_id}`);
    });
});

data.authorMentors.forEach((authorMentor) => {
    const sql = `UPDATE authors SET mentor = ${authorMentor.mentor_id} WHERE author_id = ${authorMentor.author_id}`;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(`Mentor ${authorMentor.mentor_id} added to author ${authorMentor.author_id}`);
    });
});

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");
});
