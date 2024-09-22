import bcrypt from 'bcrypt';

// Hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Cost factor
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

// Verify a password
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const match = await bcrypt.compare(password, hash);
  return match;
};