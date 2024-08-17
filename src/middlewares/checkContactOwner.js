
import createHttpError from 'http-errors';
import Contact from '../models/contact.js';


export const checkContactOwner = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { user } = req; 

    if (!user) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    
    const contact = await Contact.findOne({ _id: id, userId: user._id });

    if (!contact) {
      return next(createHttpError(403, 'Access denied: You do not own this contact'));
    }

    
    req.contact = contact;

    next();
  } catch (error) {
    next(error);
  }
};
