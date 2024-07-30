
import { Router } from 'express';
import { getContacts, getContactById } from '../controllers/contactsController.js';

const router = Router();

router.get('/contacts', getContacts);
router.get('/contacts/:contactId', getContactById);

export default router;
