import express from 'express';
import router from './routes';
import env from './env';

const app = express();

app.use('/api', router);

app.listen(env.PORT, () => {
  console.log(`Running on Port ${env.PORT}`);
});
