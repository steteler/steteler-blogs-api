const Joi = require('joi');

const updatedPostValidate = Joi.object(
  {
    title: Joi.string().messages({
      'string.empty': 'Some required fields are missing',
    }),
    content: Joi.string().messages({
      'string.empty': 'Some required fields are missing',
    }),
  },
).min(1).messages({ 'object.min': 'Some required fields are missing' });

module.exports = updatedPostValidate;