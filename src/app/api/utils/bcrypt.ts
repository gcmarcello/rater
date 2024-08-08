import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export function hashData(data: string) {
  const salt = genSaltSync(10);
  return hashSync(data, salt);
}

export function compareData(data: string, hash: string) {
  return compareSync(data, hash);
}
