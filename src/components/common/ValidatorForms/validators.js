import { validatorFromFunction } from 'validate-redux-form';
const validator = require('validator');

export const required = value => value ? undefined : 'это поле обязательно для заполнения';


export const isCorrectUrl = validatorFromFunction(value => !!(value && validator.isURL(value)));

export const isCorrectPhoneNumber = validatorFromFunction(value => !!(value && validator.isMobilePhone(value, 'ru-RU')));

export const isCorrectEmail = validatorFromFunction(value => !!(value && validator.isEmail(value)));
