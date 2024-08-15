import Joi from 'joi';
import JoiPhoneNumber from 'joi-phone-number';

const JoiExtended = Joi.extend(JoiPhoneNumber);

export const createContactSchema = JoiExtended.object({
  name: JoiExtended.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: JoiExtended.string()
    .phoneNumber({ format: 'national' })
    .required()
    .messages({
      'string.base': 'Phone should be a string',
      'phoneNumber.format': 'Phone should be in a national format',
      'any.required': 'Phone is required',
    }),
  email: JoiExtended.string().min(3).max(20).email().required().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  isFavourite: JoiExtended.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean',
  }),
  contactType: JoiExtended.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type should be a string',
      'any.required': 'Contact type is required',
      'any.only': 'Contact type must be one of [work, home, personal]',
    }),
});

export const updateContactSchema = JoiExtended.object({
  name: JoiExtended.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',

  }),
  phoneNumber: JoiExtended.string()
    .phoneNumber({ format: 'national' })
    .messages({
      'string.base': 'Phone should be a string',
      'phoneNumber.format': 'Phone should be in a national format',
      
    }),
  email: JoiExtended.string().min(3).max(20).email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email',
    
  }),
  isFavourite: JoiExtended.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean',
  }),
  contactType: JoiExtended.string()
    .valid('work', 'home', 'personal')
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': 'Contact type must be one of [work, home, personal]',
    }),
});