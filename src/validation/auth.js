import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = Joi.extend(joiPasswordExtendCore);

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().min(3).max(255).email().required().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  password: joiPassword.string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(4)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .doesNotInclude(['password'])
    .required()
    .messages({
      'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
      'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
      'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
      'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
      'password.noWhiteSpaces': '{#label} should not contain white spaces',
      'password.onlyLatinCharacters': '{#label} should contain only Latin characters',
      'password.doesNotInclude': '{#label} is too common',
    }),
});


export const loginUserSchema = Joi.object({
    email: Joi.string().min(3).max(255).email().required().messages({
        'string.base': 'Email should be a string',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
      }),
      password: joiPassword.string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(4)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .doesNotInclude(['password'])
      .required()
      .messages({
        'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
        'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
        'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
        'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
        'password.noWhiteSpaces': '{#label} should not contain white spaces',
        'password.onlyLatinCharacters': '{#label} should contain only Latin characters',
        'password.doesNotInclude': '{#label} is too common',
      }),
  });

  export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'Email should be a string',
      'string.email': 'Email must be a valid email',
      'any.required': 'Email is required',})
  
  });

  export const resetPasswordSchema = Joi.object({
    password: Joi.string().required().messages({
      'string.base': 'Password should be a string',
      'any.required': 'Password is required'
    }),
    token: Joi.string().required().messages({
      'string.base': 'Token should be a string',
      'any.required': 'Token is required'
    }),
  });