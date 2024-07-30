import Contact from '../models/contact.js';

export const findAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error('Error retrieving contacts'+ error.message);
  }
};

export const findContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  } catch (error) {
    throw new Error('Error retrieving contact' +error.message);
  }
};


export const createContact = async (payload)=>{
  const {name, phoneNumber, email, isFavourite, contactType} =payload;

  if (!name|| !email || typeof phoneNumber !== 'number'|| typeof isFavourite!== 'boolean'|| typeof contactType !== 'string') {
    throw new Error ('Invalid payload');
    
  }

  const newContact = new Contact({
    name, phoneNumber, email, isFavourite, contactType
  });
  try {
    
    const savedContact = await newContact.save();
    return savedContact;
  } catch (error) {
    
    throw new Error ('Error saving student:' + error.message)
  }
}
