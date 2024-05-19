import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { validationException } from './apiErrorHandler';
import { logger } from 'firebase-functions/v1';

export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  console.log('piyush');
  const errors = validationResult(req);
  console.log('piyush', errors);
  logger.warn(errors);
  !errors.isEmpty() ? next(validationException(errors.array())) : next();
};
