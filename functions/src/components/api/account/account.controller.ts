import { Request, Response, NextFunction } from 'express';
import { getUser } from '../../../models/user';

import { updateAccountService, updatePasswordService } from './account.service';
import { badImplementationException, unauthorizedException } from '../../../utils/apiErrorHandler';

export const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
  let user_id = req.user.user_id;
  if (!user_id) throw badImplementationException('user_id is not set properly');

  updateAccountService(user_id, req.body);
  res.status(200).json({
    message: 'Details Updated successfully',
  });
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  let user_id = req.user.user_id;
  if (!user_id) throw badImplementationException('user_id is not set properly');
  updatePasswordService(user_id, req.body);
  res.status(200).json({
    message: 'Password Changed successfully',
  });
};

export const getAccountInfo = async (req: Request, res: Response, next: NextFunction) => {
  let user_id = req.user.user_id;
  if (!user_id) throw badImplementationException('user_id is not set properly');

  let user = await getUser(user_id);
  if (!user) throw unauthorizedException('User is not exist');
  let { docId, password, ...result } = user;
  res.status(200).json(result);
};
