import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

// Hash
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// Compare
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
