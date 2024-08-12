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

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

// to delete a contact
export const deleteContact = (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};
