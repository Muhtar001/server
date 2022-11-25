const express = require('express');

const PORT = process.env.PORT || 5000;
const mysql = require('mysql');
const app = express();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port:'3306',
  password: 'password',
  database: 'world',
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Database has been connected successfully.');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/a', (req, res) => {
  res.json({this:"The first page"});
});

app.get('/api', function (req, res) {
  connection.query(
    'select * from city limit 300',
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify({thing:results}));
    }
  );
});
 
app.get('/books/:id', function (req, res) {
  connection.query(
    'select * from books where Id=?',
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

app.post('/books', function (req, res) {
  var params = req.body;
  console.log(params);
  connection.query(
    'INSERT INTO books SET ?',
    params,
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

app.put('/books', function (req, res) {
  connection.query(
    'UPDATE `books` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?',
    [
      req.body.Name,
      req.body.Address,
      req.body.Country,
      req.body.Phone,
      req.body.Id,
    ],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

app.delete('/books', function (req, res) {
  console.log(req.body);
  connection.query(
    'DELETE FROM `books` WHERE `Id`=?',
    [req.body.Id],
    function (error, results, fields) {
      if (error) throw error;
      res.end('Record has been deleted!');
    }
  );
});
