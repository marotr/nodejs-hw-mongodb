
import express from 'express';
import {
  getContacts,
  getContactById,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:id', ctrlWrapper(getContactById));
router.post('/contacts', jsonParser, ctrlWrapper(createContactController));
router.patch('/contacts/:id', jsonParser, ctrlWrapper(patchContactController));
router.delete('/contacts/:id', ctrlWrapper(deleteContactController));

export default router;
