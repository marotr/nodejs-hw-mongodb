import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { getContacts, getContactById } from './controllers/contactsController.js';

const app = express();
const logger = pino();

const setupServer = () => {
  app.use(cors());
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

 
  app.get('/contacts', getContacts);
  
 
  app.get('/contacts/:contactId', getContactById);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 8081;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
