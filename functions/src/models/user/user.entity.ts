// TODO

import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { WithSnapshotId } from '../types';

export type UserDocument = {
  user_id: string;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  address?: string;
  status?: 'active' | 'inactive';
  refresh_token?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

export type UserDocumentWithDocId = UserDocument & {
  docId: string;
};

export interface updatePasswordInterface {
  password: string;
  newPassword: string;
}
export type UserDocumentWithId = WithSnapshotId<UserDocument>;

export const USER_COLLECTION_KEY = 'users';

export const userConverter: FirestoreDataConverter<UserDocumentWithId> = {
  toFirestore(doc): DocumentData {
    return {
      user_id: doc.user_id,
      email: doc.email,
      password: doc.password,
      name: doc.name,
      phone: doc.phone,
      address: doc.address,
      status: doc.status,
      refresh_token: doc.refresh_token,
      created_at: doc.created_at,
      updated_at: doc.created_at,
      deleted_at: doc.deleted_at,
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocument>): UserDocumentWithId {
    const data = snapshot.data();
    const entity: UserDocumentWithId = {
      id: snapshot.id,
      user_id: data.user_id,
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      address: data.address,
      status: data.status,
      refresh_token: data.refresh_token,
      created_at: data.created_at,
      updated_at: data.created_at,
      deleted_at: data.deleted_at,
    };
    return entity;
  },
};
