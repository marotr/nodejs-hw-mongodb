import { Router } from 'express';
import express from 'express';
import { loginUserSchema, registerUserSchema } from '../validation/auth';
import { loginUserController, registerUserController } from '../controllers/auth';
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

router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
  );

export default router;
