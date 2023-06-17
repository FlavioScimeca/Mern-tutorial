import express, { Express, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import noteRoutes from './routes/note';
import morgan from 'morgan';
import cors from 'cors';
import createHttpError, { isHttpError } from 'http-errors';

const app: Express = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//! here we store the routing logic in a separate file
app.use('/api/notes', noteRoutes);

//! To all not found url 404
app.use((req, res, next) => {
  next(createHttpError('Endpoint not found'));
});

//! for handle the error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
