"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jwt_1 = require("../Helpers/jwt");
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['token']; // Type assertion
    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }
    try {
        // Verify token here
        const user = yield (0, jwt_1.verifyToken)(token);
        // Assuming `user` contains user information after verification
        if (!user) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        // Optionally attach user to request object
        req.user = user; // Make sure to extend the Request interface to include `user`
        next();
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to verify token', error });
    }
});
exports.verifyUser = verifyUser;
