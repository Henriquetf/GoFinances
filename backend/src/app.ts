import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.error(err);

    return response.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
  },
);

export default app;
