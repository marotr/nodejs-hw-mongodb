import * as fs from 'node:fs/promises';
import path from 'node:path';

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
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export async function getContacts(req, res, next) {
  try {
    
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const contacts = await findAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId,
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
   
    let photo = null;

    if (req.file) {
      if (process.env.ENABLE_CLOUDINARY === 'true') {
      
        const result = await saveFileToCloudinary(req.file.path);
        
        await fs.unlink(req.file.path);

        photo = result.secure_url;
      } else {
        await fs.rename(
          req.file.path,
          path.resolve('src', 'public/avatars', req.file.filename),
        );

        photo = `http://localhost:8081/avatars/${req.file.filename}`;
      }
    }

    const contact = await createContact({
      ...req.body,
      userId: req.user._id,
      photo, 
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    console.error('Error in createContactController:', error);
    next(error);
  }
};


export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params; 
    const { _id: userId } = req.user; 
    let updatedFields = { ...req.body }; 
    let photo = null;

 
    if (req.file) {
      if (process.env.ENABLE_CLOUDINARY === 'true') {
      
        const result = await saveFileToCloudinary(req.file.path);
        await fs.unlink(req.file.path); 

        photo = result.secure_url;
      } else {
        
        const newPath = path.resolve('src', 'public/avatars', req.file.filename);
        await fs.rename(req.file.path, newPath);

        photo = `http://localhost:8081/avatars/${req.file.filename}`;
      }

      
      updatedFields.photo = photo;
    }

   
    const updatedContact = await updateContact(contactId, userId, updatedFields);

   
    if (!updatedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    
    res.status(200).json({
      status: 200,
      message: 'Contact successfully updated!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export async function deleteContactController(req, res, next) {
  try {
    const { id } = req.params;
    const deletedContact = await deleteContact(id, req.user._id);

    if (!deletedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}


