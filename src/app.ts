import cors from 'cors';
import express, { Application } from 'express';
import gobalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/users/user.route';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes

app.use('/api/v1/users/', UserRoutes);

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Unhandled Promise Rejection'));
// });
/* app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Testing error logger');
}); */

//global error handler
app.use(gobalErrorHandler);

export default app;
