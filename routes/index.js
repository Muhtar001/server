import Express from 'express';
import db from '../database.js';

const router = Express.Router();

router
  .get('/', (req, res) => {
    db.query('select * from city order by Name', (error, results) => {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  })
  // rest api to get a single customer data
  .get('/:id', (req, res) => {
    db.query(
      'select * from city where Id=?',
      [req.params.id],
      (error, results) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
      },
    );
  })

  // rest api to create a new customer record into mysql database
  .post('/customer', (req, res) => {
    const params = req.body;
    console.log(params);
    db.query('INSERT INTO customer SET ?', params, (error, results) => {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  })

  // rest api to update record into mysql database
  .put('/customer', (req, res) => {
    db.query(
      'UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?',
      [
        req.body.Name,
        req.body.Address,
        req.body.Country,
        req.body.Phone,
        req.body.Id,
      ],
      (error, results) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
      },
    );
  })

  // rest api to delete record from mysql database
  .delete('/customer', (req, res) => {
    console.log(req.body);
    db.query(
      'DELETE FROM `customer` WHERE `Id`=?',
      [req.body.Id],
      (error, results) => {
        if (error) throw error;
        res.end('Record has been deleted!');
        res.json(results);
      },
    );
  });

export default router;
