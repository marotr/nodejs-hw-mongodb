import express from 'express';
import cors from 'cors';
import pino from 'pino';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const logger = pino();

const setupServer = () => {
  app.use(cors());
  app.use(express.json());
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  app.use('/', contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = process.env.PORT || 8081;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
