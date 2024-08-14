import Contact from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// to fetch all contacts
export const findAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactsQuery = Contact.find();

  if (filter.type) {
    contactsQuery.where('type').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
