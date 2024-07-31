
import { Router } from 'express';
import { getContacts, getContactById , createContactController, patchContactController, deleteContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactById));
router.post ('/contact', ctrlWrapper (createContactController));
router.patch ('/contacts/:contactId', ctrlWrapper(patchContactController));
router.delete ('students/studentId', ctrlWrapper(deleteContactController));

export default router;
