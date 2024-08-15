import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
  .pattern(/^\d+$/) 
  .required()
  .messages({
    'string.base': 'Phone number should be a string',
    'string.pattern.base': 'Phone number should contain only digits',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().min(3).max(20).email().required().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type should be a string',
      'any.required': 'Contact type is required',
      'any.only': 'Contact type must be one of [work, home, personal]',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',

  }),
  phoneNumber: Joi.string()
  .pattern(/^\d+$/) 
  .messages({
    'string.base': 'Phone number should be a string',
    'string.pattern.base': 'Phone number should contain only digits',
  
  }),
  email: Joi.string().min(3).max(20).email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email',
    
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': 'Contact type must be one of [work, home, personal]',
    }),
});