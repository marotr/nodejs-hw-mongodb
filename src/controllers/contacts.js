import createHttpError from 'http-errors';
import {
  findAllContacts,
  findContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function getContacts(req, res, next) {
  try {
    const contacts = await findAllContacts();
    res.send({ status: 200, message: 'Contacts retrieved', data: contacts });
  } catch (error) {
    next(error);  
  }
}

export async function getContactById(req, res, next) {
  try {
    const { id } = req.params;
    const contact = await findContactById(id);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.send({ status: 200, message: 'Contact retrieved', data: contact });
  } catch (error) {
    next(error);
  }
}

export async function createContactController(req, res, next) {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

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
}

export async function patchContactController(req, res, next) {
  try {
    const { id } = req.params;
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

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
}

export async function deleteContactController(req, res, next) {
  try {
    const { id } = req.params;
    const deletedContact = await deleteContact(id);

    if (!deletedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send({ status: 204, message: 'Contact deleted', data: null });
  } catch (error) {
    next(error);
  }
}
