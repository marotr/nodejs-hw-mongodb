import { findAllContacts, findContactById } from '../services/contacts.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await findAllContacts();
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
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
      return res.status(404).json({
        message: 'Contact not found',
      });
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
