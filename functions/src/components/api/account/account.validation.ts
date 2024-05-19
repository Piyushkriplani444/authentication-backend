import { Schema } from 'express-validator';

export const ACCOUNT_SCHEMA: Schema = {
  user_id: {
    in: ['body'], // Explicitly specify location for clarity
    optional: true, // Allow user_id to be omitted
    isString: true,
  },
  email: {
    in: ['body'],
    isEmail: true,
    normalizeEmail: true, // Convert email to lowercase for consistency
    errorMessage: 'Invalid email address',
  },
  password: {
    in: ['body'],
    isString: true,
    isLength: {
      options: { max: 8 },
      errorMessage: 'Password must be at least 8 characters long',
    },
  },
  name: {
    in: ['body'],
    isString: true,
    trim: true, // Remove leading/trailing whitespace
  },
  phone: {
    in: ['body'],
    optional: true,
    isString: true,
  },
  address: {
    in: ['body'],
    optional: true,
    isString: true,
  },
  status: {
    in: ['body'],
    isIn: {
      options: [['active', 'inactive']],
      errorMessage: 'Invalid status. Must be "active" or "inactive"',
    },
  },
  refresh_token: {
    in: ['body'],
    optional: true,
    isString: true,
  },
};

export const ACCOUNT_PASSWORD_SCHEMA: Schema = {};
