
export type UserType = {
  access?: string;
  username?: string;
  city?: string;
  createdAt?: string;
  gender?: string;
  id?: number;
  isFrozen?: boolean;
  latestLoginAt?: string;
  nickName?: string;
  phoneNumber?: string;
  picture?: string;
  updatedAt?: string;
}

export type UserListData = {
  list?: UserType[];
  count?: number;
}
