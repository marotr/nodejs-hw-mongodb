import createHttpError from "http-errors";
import {
  findAllContacts as fetchContacts,
  findContactById as fetchContactById,
  createContact,
  updateContact,
  deleteContact
} from "../services/contacts.js";

// Controller to get all contacts
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await fetchContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to get a contact by ID
export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await fetchContactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with ID: ${contactId}`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to create a new contact
export const createContactController = async (req, res, next) => {
  try {
    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to patch a contact
export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to delete a contact
export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
