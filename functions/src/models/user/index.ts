// TODO
import { db } from '../../utils/firebase';
import { USER_COLLECTION_KEY, UserDocument, UserDocumentWithDocId, userConverter } from './user.entity';
import { APIError } from '../../constants/exceptions';
import HttpStatusCode from '../../constants/statusCode';

import { getCurrentJST } from '../../utils/dayjs';

export const addUser = async (user: UserDocument) => {
  try {
    const entry = db.collection(USER_COLLECTION_KEY).doc();
    await entry.set(user);
    return true;
  } catch (err: any) {
    throw new APIError(err.toString(), HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
};

export const updateUser = async (id: string, data: UserDocument) => {
  try {
    const entry = db.collection(USER_COLLECTION_KEY).doc(id);
    data.updated_at = getCurrentJST();
    await entry.update(data);
    return true;
  } catch (err) {
    console.log(err);

    throw new APIError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
};

export const getUser = async (id: string): Promise<void | UserDocumentWithDocId> => {
  try {
    const userRef = await db.collection(USER_COLLECTION_KEY).where('user_id', '==', id);

    const doc = await userRef.get();
    if (!doc.empty) {
      // Loop through the results (there might be multiple matches)
      let userData;
      doc.forEach((doc) => {
        // Access the document data
        userData = doc.data();
        userData.docId = doc.id;
      });
      return userData;
    } else {
      console.log('No user found with the specified email.');
      return;
    }
  } catch (err) {
    console.log('pkpkpk', err);
    throw new APIError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
};

export const getUserByEmail = async (email: string): Promise<void | UserDocumentWithDocId> => {
  try {
    const userRef = await db.collection(USER_COLLECTION_KEY).where('email', '==', email);

    const doc = await userRef.get();
    if (!doc.empty) {
      // Loop through the results (there might be multiple matches)
      let userData;
      doc.forEach((doc) => {
        // Access the document data
        userData = doc.data();
        userData.docId = doc.id;
      });
      return userData;
    } else {
      console.log('No user found with the specified email.');
      return;
    }
  } catch (err) {
    console.log('pkpkpk', err);
    throw new APIError(`Something went wron ${err}`, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
};
