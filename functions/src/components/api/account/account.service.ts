import { getUser, updateUser } from '../../../models/user';
import { UserDocument, updatePasswordInterface } from '../../../models/user/user.entity';
import { unauthorizedException } from '../../../utils/apiErrorHandler';
import { comparePassword, hashPassword } from '../../../utils/bcrypt';

export const updateAccountService = async (user_id: string, data: UserDocument) => {
  // TODO
  const user = await getUser(user_id);
  if (!user) throw unauthorizedException('User is not exist');
  await updateUser(user.docId, data);
  return;
};

export const updatePasswordService = async (user_id: string, data: updatePasswordInterface) => {
  // TODO
  const { password, newPassword } = data;
  const user = await getUser(user_id);
  if (!user) throw unauthorizedException('User is not exist');
  await comparePassword(password, user.password);
  user.password = await hashPassword(newPassword);
  await updateUser(user.docId, user);
  return;
};
