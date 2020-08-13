import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import AppError from './errors/AppError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.error(err);

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export default app;
