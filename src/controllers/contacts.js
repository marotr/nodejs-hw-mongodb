import createHttpError from 'http-errors';

import {
  findAllContacts,
  findContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function getContacts (req, res)  {
 
    const contacts = await findAllContacts();
    res.send({ status: 200, message: 'Contacts retrieved', data: contacts });
  
};

export async function getContactById  (req, res, next) {
 
    const { id } = req.params;

   

    const contact = await findContactById(id);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

};

export async function createContactController  (req, res, next) {
  
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
 
};

export async function patchContactController  (req, res, next) {
  
    const { id } = req.params;

  

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
 
};

export async function deleteContactController  (req, res, next)  {
 
    const { id } = req.params;

    const deletedContact = await deleteContact(id);

    if (!deletedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res
      .status(204)
      .send({ status: 204, message: 'Contact deleted', data: null });
 
};
