import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';

dotenv.config();

const setupServer = () => {
  const app = express();
  const logger = pino();
  
  
  app.use(cors());
  
  
  app.use(pinoHttp({ logger }));


  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });


  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
