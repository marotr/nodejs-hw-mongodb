import dotenv from 'dotenv';
dotenv.config();

import setupServer from './server.js';
import initMongoConnection from './db/initMongoConnection.js';
// import Contact from './models/contact.js';


const startServer = async () => {
  try {
    await initMongoConnection();
    console.log('Connected to MongoDB');
    

    // const testContact = new Contact({
    //   name: "Test Contact",
    //   phoneNumber: "123-456-7890",
    //   email: "test@example.com",
    //   isFavourite: true,
    //   contactType: "work"
    // });

    // await testContact.save();
    // console.log('Test contact saved:', testContact);

  
    setupServer();
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); 
}
};

startServer();