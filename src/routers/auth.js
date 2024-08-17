import { Router } from 'express';
import express from 'express';
import { registerUserSchema } from '../validation/auth';
import { registerUserController } from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default router;
