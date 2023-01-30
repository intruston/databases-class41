const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");

  const tables = [
    {
      table_name: "invitee",
      delete: `DROP TABLE IF EXISTS invitee;`,
      sql: `CREATE TABLE invitee (
                    invitee_no int NOT NULL,
                    invitee_name varchar(45) NOT NULL,
                    invited_by varchar(45) NOT NULL,
                    PRIMARY KEY (invitee_no)
                );`,
    },
    {
      table_name: "meeting",
      delete: `DROP TABLE IF EXISTS meeting;`,
      sql: `CREATE TABLE meeting (
                  meeting_no int NOT NULL,
                  meeting_title varchar(45) NOT NULL,
                  starting_time datetime NOT NULL,
                  ending_time datetime NOT NULL,
                  room_no varchar(45) NOT NULL,
                  PRIMARY KEY (meeting_no)
              );`,
    },
    {
      table_name: "room",
      delete: `DROP TABLE IF EXISTS room;`,
      sql: `CREATE TABLE room (
                  room_no int NOT NULL,
                  room_name varchar(45) NOT NULL,
                  floor_number varchar(45) NOT NULL,
                  PRIMARY KEY (room_no)
              );`,
    },
  ];

  tables.forEach((table) => {
    connection.query(table.delete, (err, res) => {
      if (err) throw err;
      console.log(`Table deleted: ${table.table_name}`);
    });
  });

  tables.forEach((table) => {
    connection.query(table.sql, (err, res) => {
      if (err) throw err;
      console.log(`Table created: ${table.table_name}`);
    });
  });

  const invitees = [
    { invitee_no: 1, invitee_name: "Beyonce", invited_by: "Taylor Swift" },
    { invitee_no: 2, invitee_name: "Lady Gaga", invited_by: "Ariana Grande" },
    { invitee_no: 3, invitee_name: "Adele", invited_by: "Rihanna" },
    { invitee_no: 4, invitee_name: "Katy Perry", invited_by: "Harry Styles" },
    { invitee_no: 5, invitee_name: "The Weeknd", invited_by: "Justin Bieber" },
  ];

  invitees.forEach((invitee) => {
    connection.query("INSERT INTO invitee SET ?", invitee, (err, res) => {
      if (err) throw err;
      console.log("Invitee inserted:", invitee);
    });
  });

  const rooms = [
    { room_no: 1, room_name: "Johan Cruijff ArenA", floor_number: 1 },
    { room_no: 2, room_name: "De Kuip", floor_number: 1 },
    { room_no: 3, room_name: "Philips Stadion", floor_number: 2 },
    { room_no: 4, room_name: "AFAS Stadion", floor_number: 2 },
    { room_no: 5, room_name: "Cars Jeans Stadion", floor_number: 2 },
  ];

  rooms.forEach((room) => {
    connection.query("INSERT INTO room SET ?", room, (err, res) => {
      if (err) throw err;
      console.log("Room inserted:", room);
    });
  });

  const meetings = [
    {
      meeting_no: 1,
      meeting_title: "Show 1",
      starting_time: "2023-01-30 10:00:00",
      ending_time: "2023-01-30 11:00:00",
      room_no: 1,
    },
    {
      meeting_no: 2,
      meeting_title: "Show 2",
      starting_time: "2023-01-31 11:00:00",
      ending_time: "2023-01-31 12:00:00",
      room_no: 2,
    },
    {
      meeting_no: 3,
      meeting_title: "Show 3",
      starting_time: "2023-02-01 12:00:00",
      ending_time: "2023-02-01 13:00:00",
      room_no: 3,
    },
    {
      meeting_no: 4,
      meeting_title: "Show 4",
      starting_time: "2023-02-02 13:00:00",
      ending_time: "2023-02-02 14:00:00",
      room_no: 4,
    },
    {
      meeting_no: 5,
      meeting_title: "Show 5",
      starting_time: "2023-02-03 14:00:00",
      ending_time: "2023-02-03 15:00:00",
      room_no: 5,
    },
  ];

  meetings.forEach((meeting) => {
    connection.query("INSERT INTO meeting SET ?", meeting, (err, res) => {
      if (err) throw err;
      console.log("Meeting inserted:", meeting);
    });
  });

  connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");
  });
});
