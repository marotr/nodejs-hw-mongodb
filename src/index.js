import dotenv from 'dotenv';
dotenv.config();

import setupServer from './server.js';
import initMongoConnection from './db/initMongoConnection.js';
import Contact from './models/contact.js';

const startServer = async () => {

  await initMongoConnection();
  
 
  const testContact = new Contact({
    name: "Test Contact",
    phoneNumber: "123-456-7890",
    email: "test@example.com",
    isFavourite: true,
    contactType: "work"
  });

  await testContact.save();
  console.log('Test contact saved:', testContact);


  setupServer();
};

startServer();
