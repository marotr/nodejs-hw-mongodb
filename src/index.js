

import dotenv from 'dotenv';
dotenv.config();


import setupServer from './server.js';
import initMongoConnection from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';



const startServer = async () => {
  try {
    await initMongoConnection();
    console.log('Connected to MongoDB');

    
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    
 
    setupServer();
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); 
  }
};


startServer();
