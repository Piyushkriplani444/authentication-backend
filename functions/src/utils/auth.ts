import { Request, Response, NextFunction } from 'express';
import { unauthorizedException } from './apiErrorHandler';
import { logger } from 'firebase-functions/v1';

import { decodeJwt } from './jwt';

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearer = req.headers['authorization'];
    if (!bearer) throw unauthorizedException('No token provided');

    // TODO
    let token: string | null = '';

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    const jwtToken: any = await decodeJwt(token, 'access');

    req.user = { user_id: jwtToken.id, name: '' };
    next();
  } catch (err) {
    logger.warn(err);
    next(err);
  }
};
