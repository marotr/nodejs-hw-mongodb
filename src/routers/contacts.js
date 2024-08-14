import express from 'express';
import {
  getContacts,
  getContactById,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidID.js';

const router = express.Router();


const jsonParser = express.json();

router.get('/', ctrlWrapper(getContacts));
router.get('/:id', isValidId, ctrlWrapper(getContactById));
router.post(
  '/',
  validateBody(createContactSchema),
  jsonParser, 
  ctrlWrapper(createContactController),
);
router.patch(
  '/:id',
  isValidId,
  validateBody(createContactSchema),
  jsonParser, 
  ctrlWrapper(patchContactController),
);
router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default router;
