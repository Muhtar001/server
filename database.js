import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// start mysql connection
const connection = mysql.createConnection({
  host: process.env.HOST, // mysql database host name
  user: process.env.USER, // mysql database user name
  port: process.env.PORTDB,
  password: process.env.PASSWORD, // mysql database password
  database: process.env.DATABASE, // mysql database name
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Database has been connected');
});
// end mysql connection
export default connection;
