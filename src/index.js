import dotenv from 'dotenv';
dotenv.config();

import setupServer from './server.js';
import initMongoConnection from './db/initMongoConnection.js';


const startServer = async () => {
  try {
    await initMongoConnection();
    console.log('Connected to MongoDB');

  
    setupServer();
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); 
}
};

startServer();
