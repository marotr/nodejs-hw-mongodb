import Contact from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// to fetch all contacts
export const findAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
  userId
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contact.find({ userId, ...filter });

  if (filter.type) {
    contactsQuery.where('type').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),

  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};


// to fetch contacts by ID
export const findContactById = ({ _id, userId }) => {
 
  return Contact.findById({ _id, userId });
};

// to create a new contact
export const createContact = (payload) => {
  return Contact.create(payload);
};

// to update a contact
export const updateContact = (contactId, userId,payload) => {
  return Contact.findByIdAndUpdate({ _id: contactId, userId }, payload, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });
};

// to delete a contact
export const deleteContact = (contactId, userId) => {
  return Contact.findByIdAndDelete({ _id: contactId, userId });
};
