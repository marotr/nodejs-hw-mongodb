import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import {
  findAllContacts,
  findContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await findAllContacts();
    res.send({ status: 200, message: 'Contacts retrieved', data: contacts });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, 'Contact not found'));
    }

    const contact = await findContactById(id);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.send({ status: 200, message: 'Contact retrieved', data: contact });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (
      !name ||
      !email ||
      typeof phoneNumber !== 'number' ||
      typeof isFavourite !== 'boolean' ||
      typeof contactType !== 'string'
    ) {
      return next(createHttpError(400, 'Invalid payload'));
    }

    const contact = {
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    };

    const createdContact = await createContact(contact);
    res
      .status(201)
      .send({ status: 201, message: 'Contact created', data: createdContact });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, 'Contact not found'));
    }

    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (
      !name ||
      !email ||
      typeof phoneNumber !== 'number' ||
      typeof isFavourite !== 'boolean' ||
      typeof contactType !== 'string'
    ) {
      return next(createHttpError(400, 'Invalid payload'));
    }

    const contact = {
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    };

    const updatedContact = await updateContact(id, contact);

    if (!updatedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.send({ status: 200, message: 'Contact updated', data: updatedContact });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, 'Contact not found'));
    }

    const deletedContact = await deleteContact(id);

    if (!deletedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res
      .status(204)
      .send({ status: 204, message: 'Contact deleted', data: null });
  } catch (error) {
    next(error);
  }
};
