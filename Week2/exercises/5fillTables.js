const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const authors = [
    { author_name: 'Marie Curie', university: 'Sorbonne University', date_of_birth: '1867-11-07', h_index: 10, gender: 'female' },
    { author_name: 'Albert Einstein', university: 'University of Zurich', date_of_birth: '1879-03-14', h_index: 20, gender: 'male' },
    { author_name: 'Dorothy Crowfoot Hodgkin', university: 'University of Oxford', date_of_birth: '1910-05-12', h_index: 30, gender: 'female' },
    { author_name: 'Linus Pauling', university: 'California Institute of Technology', date_of_birth: '1901-02-28', h_index: 40, gender: 'male' },
    { author_name: 'Frederic Passy', university: 'College de France', date_of_birth: '1822-05-20', h_index: 50, gender: 'other' },
    { author_name: 'John Bardeen', university: 'University of Illinois', date_of_birth: '1908-05-23', h_index: 60, gender: 'male' },
    { author_name: 'John van Neumann', university: 'Princeton University', date_of_birth: '1903-12-28', h_index: 70, gender: 'male' },
    { author_name: 'Max Born', university: 'University of Gottingen', date_of_birth: '1882-12-11', h_index: 80, gender: 'male' },
    { author_name: 'Erwin Schrodinger', university: 'University of Vienna', date_of_birth: '1887-08-12', h_index: 90, gender: 'male' },
    { author_name: 'Richard Feynman', university: 'California Institute of Technology', date_of_birth: '1918-05-11', h_index: 85, gender: 'male' },
    { author_name: 'Paul Dirac', university: 'University of Bristol', date_of_birth: '1902-08-08', h_index: 75, gender: 'male' },
    { author_name: 'Subrahmanyan Chandrasekhar', university: 'University of Cambridge', date_of_birth: '1910-10-19', h_index: 65, gender: 'male' },
    { author_name: 'Emilio Segre', university: 'University of Rome La Sapienza', date_of_birth: '1905-08-24', h_index: 55, gender: 'male' },
    { author_name: 'James Peebles', university: 'Princeton University', date_of_birth: '1935-04-25', h_index: 45, gender: 'male' },
    { author_name: 'Maria Goeppert Mayer', university: 'University of Gottingen', date_of_birth: '1906-06-28', h_index: 35, gender: 'female' }
  ];
  
const research_papers = [
    { paper_title: 'Radioactivity', conference: 'Academy of Sciences', publish_date: '1903-01-01', author_id: 1 },
    { paper_title: 'Theory of General Relativity', conference: 'Physical Society of Berlin', publish_date: '1915-01-01', author_id: 2 },
    { paper_title: 'Structure of penicillin', conference: 'Royal Society of Chemistry', publish_date: '1945-01-01', author_id: 3 },
    { paper_title: 'The Nature of the Chemical Bond', conference: 'National Academy of Sciences', publish_date: '1939-01-01', author_id: 4 },
    { paper_title: 'International Peace', conference: 'Academy of Moral and Political Sciences', publish_date: '1875-01-01', author_id: 5 },
    { paper_title: 'Transistor theory', conference: 'Institute of Electrical and Electronics Engineers', publish_date: '1948-01-01', author_id: 6 },
    { paper_title: 'Mathematical foundations of quantum mechanics', conference: 'Society of Natural Scientists', publish_date: '1925-01-01', author_id: 7 },
    { paper_title: 'The statistical interpretation of quantum mechanics', conference: 'Royal Society of Edinburgh', publish_date: '1926-01-01', author_id: 8 },
    { paper_title: 'The Feynman Lectures on Physics', conference: 'Addison-Wesley', publish_date: '1963-01-01', author_id: 9 },
    { paper_title: 'Relativistic wave equations', conference: 'Royal Society', publish_date: '1928-01-01', author_id: 10 },
    { paper_title: 'Chandrasekhar limit', conference: 'Astrophysical Journal', publish_date: '1931-01-01', author_id: 11 },
    { paper_title: 'Equations of motion in general relativity', conference: 'Annals of Mathematics', publish_date: '1915-01-01', author_id: 12 },
    { paper_title: 'Particle accelerators', conference: 'Journal of Applied Physics', publish_date: '1952-01-01', author_id: 13 },
    { paper_title: 'Early Universe', conference: 'Astrophysical Journal', publish_date: '1977-01-01', author_id: 14 },
    { paper_title: 'Theories of nucleon-nucleon interaction', conference: 'Nuclear Physics', publish_date: '1954-01-01', author_id: 15 }
];
  
  
authors.forEach(author => {
    connection.query('INSERT INTO authors SET ?', author, function (error, results) {
      if (error) throw error;
      console.log(`Author ${author.author_name} added!`);
    });
  });
  
research_papers.forEach(paper => {
    connection.query('INSERT INTO research_papers SET ?', paper, function (error, results) {
      if (error) throw error;
      console.log(`Research paper ${paper.paper_title} added!`);
    });
  });

connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");});
