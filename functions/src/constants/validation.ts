import { ParamSchema, Location, check } from 'express-validator';
import { REGEXP_PASSWORD } from './regexp';

export const VALIDATION_STRING = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});
export const VALIDATION_TOKEN = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_EMAIL_NOT_EXIST = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: true,
  normalizeEmail: true,
  trim: true,
});

const validatePassword = (regex: RegExp) => {
  return check().custom((value) => {
    if (!regex.test(value)) {
      throw new Error('Invalid password format');
    }
    return true;
  });
};

export const VALIDATION_PASSWORD = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { min: 8 },
  },
  custom: validatePassword(REGEXP_PASSWORD) as any,
});

export const VALIDATION_ACCOUNT_TEL = (where: Location): ParamSchema => ({
  in: [where],
  isLength: {
    options: { min: 10 },
  },
});

export const VALIDATION_EMAIL_EXIST = (where: Location): ParamSchema =>
  ({
    in: [where],
    isEmail: true,
    normalizeEmail: true,
    trim: true,
  } as ParamSchema);

export const VALIDATION_PASSWORD_CHECK = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { min: 8 },
  },
  custom: validatePassword(REGEXP_PASSWORD) as any,
});
