import { Router } from 'express';
import express from 'express';
import { loginUserSchema, registerUserSchema, requestResetEmailSchema } from '../validation/auth.js';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController, requestResetEmailController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

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

  router.post('/logout', ctrlWrapper(logoutUserController));

  router.post('/refresh', ctrlWrapper(refreshUserSessionController));

  router.post(
    '/request-reset-email',
    jsonParser,
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController),
  );
router.post()
export default router;
