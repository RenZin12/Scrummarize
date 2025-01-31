import express from 'express';
import cors from 'cors';
import routes from './routes/index.mjs';
import expressSession from 'express-session';
import passport from 'passport';
import './strategies/local-strategy.mjs';
import connectPGSimple from 'connect-pg-simple';
import pgPool from './database/database.mjs';

const app = express();

app.use(cors());
app.use(express.json());

const pgSession = connectPGSimple(expressSession);
app.use(
  expressSession({
    secret: 'scrummarize',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: new pgSession({
      pool: pgPool,
      createTableIfMissing: true,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
