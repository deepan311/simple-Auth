import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Use a strong, unique key

// Create a token
export const createToken = (email: string): string => {
  const token = jwt.sign({email }, secretKey, { expiresIn: '4h' }); // Set expiration as needed
  return token;
};

// Verify a token
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Returns the decoded payload if valid
  } catch (err) {
    return null; // Token is invalid
  }
};
