import { Router } from 'express';
import express from 'express'
import {
  getContacts,
  getContactById,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactById));
router.post('/contacts', jsonParser , ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', jsonParser, ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
