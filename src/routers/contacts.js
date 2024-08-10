
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

router.get('/', ctrlWrapper(getContacts));
router.get('/:id', ctrlWrapper(getContactById));
router.post('/', jsonParser, ctrlWrapper(createContactController));
router.patch('/:id', jsonParser, ctrlWrapper(patchContactController));
router.delete('/:id', ctrlWrapper(deleteContactController));

export default router;
