import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export const EncryptAdapter = {
  hash: (password: string) => {
    const salt = genSaltSync(12);
    return hashSync(password, salt);
  },

  compare: (unHashedPassword: string, hashedPassword: string) => {
    return compareSync(unHashedPassword, hashedPassword);
  },
};
