import express from 'express';
import path from "node:path";
import cors from 'cors';
import pino from 'pino';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js'


const app = express();
const logger = pino();

const setupServer = () => {
  // Middleware setup
  app.use(express.json());
  app.use(cors());
 

  app.use(cookieParser());
  app.use("/avatars", express.static(path.resolve("src", "public/avatars")));

  // Logging
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  // Routes
  app.use('/', router);

  // Error handling
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  // Start server
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
