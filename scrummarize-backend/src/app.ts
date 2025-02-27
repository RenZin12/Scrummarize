import express, { NextFunction, Request, Response } from 'express';
import router from './routes';
import env from './env';

const app = express();

app.use(express.json());

app.use('/api', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app
  .listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
  })
  .on('error', (err) => {
    console.error('❌ Server failed to start:', err);
  });
