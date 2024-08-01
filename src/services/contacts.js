import Contact from '../models/contact.js';

// to fetch all contacts
export const findAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    console.log('Retrieved contacts:', contacts); // Add this line to see the actual data

    return contacts;
  } catch (error) {
    throw new Error('Error retrieving contacts'+ error.message);
  }
};

// to fetch contacts by ID

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

// to create a new contact

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

// to update a contact
export const updateContact = async (contactId, payload) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
      },
    );

    if (!updatedContact) return null;

    return updatedContact;
  } catch (error) {
    throw new Error('Error updating contact: ' + error.message);
  }
};

// to delete a contact
export const deleteContact = async (contactId) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: contactId });
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  } catch (error) {
    throw new Error('Error deleting contact: ' + error.message);
  }
};