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

const authorMentors = [
    { author_id: 1, mentor_id: 15 },
    { author_id: 2, mentor_id: 14 },
    { author_id: 3, mentor_id: 13 },
    { author_id: 4, mentor_id: 12 },
    { author_id: 5, mentor_id: 11 },
    { author_id: 6, mentor_id: 10 },
    { author_id: 7, mentor_id: 9 },
    { author_id: 8, mentor_id: 1 },
    { author_id: 9, mentor_id: 7 },
    { author_id: 10, mentor_id: 6 },
    { author_id: 11, mentor_id: 5 },
    { author_id: 12, mentor_id: 4 },
    { author_id: 13, mentor_id: 3 },
    { author_id: 14, mentor_id: 2 },
    { author_id: 15, mentor_id: 8 }
];

const addMentors = (authorMentors) => {
    authorMentors.forEach((author) => {
        const sql = `UPDATE authors SET mentor = ${author.mentor_id} WHERE author_id = ${author.author_id}`;
      connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(`Mentor ${author.mentor_id} added to author ${author.author_id}`);
    });
});
};
      
addMentors(authorMentors);

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");});
