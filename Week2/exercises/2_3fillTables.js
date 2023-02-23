const data = require('./data.json');
const { startConnection, doQuery, endConnection } = require('./connection.js');

startConnection();

data.authors.forEach(author => {
  sql = 'INSERT INTO authors SET ?';
  doQuery(sql, author, `Author ${author.author_name} added!`);
  });

data.research_papers.forEach(paper => {
  sql = 'INSERT INTO research_papers SET ?';
  doQuery(sql, paper, `Research paper ${paper.paper_title} added!`);
  });

data.author_paper.forEach((authorPaper) => {
  sql = 'INSERT INTO author_paper SET ?';
  doQuery(sql, authorPaper, `Author ${authorPaper.author_id} linked to paper ${authorPaper.paper_id}`);
});

data.authorMentors.forEach((authorMentor) => {
    const sql = `UPDATE authors SET mentor = ${authorMentor.mentor_id} WHERE author_id = ${authorMentor.author_id}`;
    doQuery(sql, null, `Mentor ${authorMentor.mentor_id} added to author ${authorMentor.author_id}`);
});

endConnection();
