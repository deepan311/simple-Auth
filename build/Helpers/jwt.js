"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'your_secret_key'; // Use a strong, unique key
// Create a token
const createToken = (email) => {
    const token = jsonwebtoken_1.default.sign({ email }, secretKey, { expiresIn: '4h' }); // Set expiration as needed
    return token;
};
exports.createToken = createToken;
// Verify a token
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded; // Returns the decoded payload if valid
    }
    catch (err) {
        return null; // Token is invalid
    }
};
exports.verifyToken = verifyToken;
