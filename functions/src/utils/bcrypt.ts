import bcrypt, { hash } from 'bcryptjs';
import HttpStatusCode from '../constants/statusCode';
import { APIError } from '../constants/exceptions';
import { PASSWORD_NOT_MATCH } from '../constants/errorMessage';

export const comparePassword = async (password: string, hashedPassword: string) => {
  // const isMatch = await bcrypt.compare(password, hashedPassword);
  bcrypt.compare(password, hashedPassword, async (error, isMatch) => {
    if (error) {
      throw new Error('Password do not match');
    }
    if (isMatch) {
      return isMatch;
    }
  });
}; // TODO

export const hashPassword = (password: string) => {
  try {
    const hash = bcrypt.hash(password, 10);
    return hash;
  } catch (error: any) {
    throw new APIError(error.toString(), HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}; // TODO
