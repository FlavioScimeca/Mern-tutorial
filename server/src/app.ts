import express, { Express, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import noteRoutes from './routes/note';

const app: Express = express();

app.use(express.json());

//! here we store the routing logic in a separate file
app.use('/api/notes', noteRoutes);

//! To all not found url
app.use((req, res, next) => {
  next(Error('Endpoint not found'));
});

//! for handle the error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occurred';
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
