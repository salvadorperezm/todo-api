import * as bcrypt from 'bcrypt';

export const hashPassword = (rawPassword: string) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(rawPassword, salt);
  return hash;
};

export const comparePasswords = (rawPassword: string, hash: string) => {
  return bcrypt.compareSync(rawPassword, hash);
};
