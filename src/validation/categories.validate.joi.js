const Joi = require('joi');

const categoryValidate = Joi.object(
  {
    name: Joi.string().required(),
  },
);

module.exports = categoryValidate;