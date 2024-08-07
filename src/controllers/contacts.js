import createHttpError from 'http-errors';

import {
  findAllContacts,
  findContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const getContacts = async (req, res) => {
  const students = await findAllContacts();

  res.send({ status: 200, data: students });
};

export const getContactById = async (req, res, next) => {
  const { id } = req.params;

  const contact = await findContactById(id);

  if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.send({ status: 200, data: contact });
};

export const createContactController = async (req, res) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const createdContact = await createContact(contact);

  res
    .status(201)
    .send({ status: 201, message: 'Contact created', data: createdContact });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const updateResult = await updateContact(id, contact);

  if (updateResult.lastErrorObject.updatedExisting === true) {
    return res.send({
      status: 200,
      message: 'Contact updated',
      data: updateResult.value,
    });
  }
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;

  const deletedContact = await deleteContact(id);

  if (deletedContact === null) {
    return next(createHttpError.NotFound('Contact not found'));
  }

  res.status(204).end();
};
