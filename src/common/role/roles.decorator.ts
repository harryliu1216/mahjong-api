import { SetMetadata } from '@nestjs/common';

export enum Role {
  Admin = 10001,
  StoreAdmin = 20001,
  Store = 20002
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export function Log(name) {
  console.log(name);
  return function decorator(Class) {};
}
