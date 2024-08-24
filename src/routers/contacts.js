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
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidID } from '../middlewares/isValidID.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkContactOwner } from '../middlewares/checkContactOwner.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.use(express.json());
router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.use(authenticate);
router.get('/', ctrlWrapper(getContacts));
router.get('/:id', isValidID, ctrlWrapper(getContactById));

router.post(
  '/',
  upload.single("photo"),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);



router.patch(
  '/:id',
  isValidID,
  checkContactOwner,
  upload.single("photo"),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:id',
  isValidID,
  checkContactOwner,
  ctrlWrapper(deleteContactController),
);



export default router;
