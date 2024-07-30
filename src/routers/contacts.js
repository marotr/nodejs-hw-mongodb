
import { Router } from 'express';
import { getContacts, getContactById , createContactController} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactById));
router.post ('/contact', ctrlWrapper (createContactController))

export default router;
