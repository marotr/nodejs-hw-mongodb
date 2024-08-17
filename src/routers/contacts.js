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
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidID } from '../middlewares/isValidID.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();


router.use(express.json());


router.get('/', ctrlWrapper(getContacts));
router.get('/:id', isValidID, ctrlWrapper(getContactById));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

router.patch(
  '/:id',
  isValidID,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);

router.delete('/:id', isValidID, ctrlWrapper(deleteContactController));

router.use(authenticate);

router.get('/', ctrlWrapper(getContacts));

export default router;
