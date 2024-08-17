import createHttpError from 'http-errors';
import {
  findAllContacts,
  findContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationPage.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getContacts(req, res, next) {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await findAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId: req.user._id,
    });
    res
      .status(200)
      .json({ status: 200, message: 'Contacts retrieved', data: contacts });
  } catch (error) {
    next(error);
  }
}

export async function getContactById(req, res, next) {
  try {
    const { id } = req.params;
    const contact = await findContactById({ _id: id, userId: req.user._id });

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Contact retrieved',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

export const createContactController = async (req, res, next) => {
  try {
    const contact = await createContact({
      ...req.body,
      userId: req.user._id  
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateContact(
      { _id: id, userId: req.user._id },
      updatedData,
      { new: true },
    );

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  } catch (error) {
    next(error);
  }
};

export async function deleteContactController(req, res, next) {
  try {
    const { id } = req.params;
    const deletedContact = await deleteContact({
      _id: id,
      userId: req.user._id,
    });

    if (!deletedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
