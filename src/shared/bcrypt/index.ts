import bcrypt from 'bcrypt';

const saltRounds = 10;
export const hashing = async (password: string) => {
  const salt = await bcrypt.genSalt(saltRounds);

  const passHashing = await bcrypt.hash(password, salt);

  return passHashing;
};

export const comparing = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
