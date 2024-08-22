import bcrypt from 'bcrypt';

import { UsersCollection } from '../models/user.js';
import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, ONE_MONTH, SMTP } from '../constants/index.js';
import { SessionsCollection } from '../models/session.js';

import { randomBytes } from 'crypto';
import { sendEmail } from '../utils/sendMail.js';
import { jwt} from 'jsonwebtoken';
// import Contact from '../models/contact.js';

//Register User

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

//LOGIN
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  });
};

// LOGOUT
export const logoutUser = async (sessionId) => {
    await SessionsCollection.deleteOne({ _id: sessionId });
  };



// Helper function to create a new session
  const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
  
    return {
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
      refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
    };
  };
  

  //REFRESH USER
  export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
    const session = await SessionsCollection.findOne({
      _id: sessionId,
      refreshToken,
    });
  
    if (!session) {
      throw createHttpError(401, 'Session not found');
    }
  
    const isSessionTokenExpired =
      new Date() > new Date(session.refreshTokenValidUntil);
  
    if (isSessionTokenExpired) {
      throw createHttpError(401, 'Session token expired');
    }
    
    const newSession = createSession();
  
    await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });
  
    return await SessionsCollection.create({
      userId: session.userId,
      ...newSession,
    });
  };

  //Reset email

  export const requestResetToken = async (email) => {
    const user = await UsersCollection.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    const resetToken = jwt.sign(
      {
        sub: user._id,
        email,
      },
      process.env('JWT_SECRET'),
      {
        expiresIn: '15m',
      },
    );
   sendEmail({
    from:SMTP.FROM_EMAIL,
    to:email,
    subject:"Reset your password",
    html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`
   })
  };