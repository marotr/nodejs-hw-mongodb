import Contact from '../models/contact.js';

// to fetch all contacts
export const findAllContacts = () => {
  return Contact.find();
};

// to fetch contacts by ID
export const findContactById = (contactId) => {
  return Contact.findById(contactId);
};

// to create a new contact
export const createContact = (payload) => {
  return Contact.create(payload);
};

// to update a contact
export const updateContact = (contactId, payload) => {
  return Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });
};

// to delete a contact
export const deleteContact = (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};
