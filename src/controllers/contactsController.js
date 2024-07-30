import { findAllContacts, findContactById } from '../services/contacts.js';
import createHttpError from 'http-errors'
export const getContacts = async (req, res) => {
  try {
    const contacts = await findAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to get contacts',
      error: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await findContactById(contactId);

    if (!contact) {
      {throw createHttpError (404, 'Contact not found')
      }
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get contact',
      error: error.message,
    });
  }
};
