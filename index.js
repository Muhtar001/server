import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routes from './routes/index.js';

dotenv.config();
const app = express();

// body-parser configuration
app
  .use(bodyParser.json()) // to support JSON-encoded bodies
  .use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true,
    }),
  )

  // Express session configuration
  .use(
    session({
      secret: '123456cat',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 },
    }),
  )

  // Cookie parser configuration
  .use(cookieParser())

  // static file configuration
  .use(express.static(path.join(__dirname, 'public')))

  // Routing configuration
  .use('/api', routes)

  // Server configuration
  .listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
  });

export default app;
