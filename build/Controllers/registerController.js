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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delUser = exports.userData = exports.login = exports.registerUsers = void 0;
const Register_1 = __importDefault(require("../Models/Register"));
const bcrypt_1 = require("../Helpers/bcrypt");
const jwt_1 = require("../Helpers/jwt");
const registerUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, conformPassword } = req.body;
        // Validate the inputs
        if (!name || !email || !password || !conformPassword) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        // Check if the password and conform password match
        if (password !== conformPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }
        // Check if the email is already registered
        const existingUser = yield Register_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        const hashPass = yield (0, bcrypt_1.hashPassword)(password);
        // Create a new user
        const newUser = new Register_1.default({ name, email, password: hashPass });
        // Save the user to the database
        yield newUser.save();
        const jwtToken = (0, jwt_1.createToken)(email);
        res.status(201).json({ msg: "User registered successfully", token: jwtToken });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error", error });
    }
});
exports.registerUsers = registerUsers;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate the inputs
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        // Check if the email is registered
        const user = yield Register_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "User Not Found" });
        }
        // Check if the password matches
        const isMatch = yield (0, bcrypt_1.verifyPassword)(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Password Not Match" });
        }
        const jwtToken = (0, jwt_1.createToken)(email);
        res.status(200).json({ msg: "User logged in successfully", token: jwtToken });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error", error });
    }
});
exports.login = login;
const userData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userDatas = yield Register_1.default.findOne({ email: user.email }).select('-password');
        if (!userDatas) {
            return res.status(401).json({ msg: "User Not Found" });
        }
        res.status(200).json({ msg: "fetch successfully", data: userDatas });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error", error });
    }
});
exports.userData = userData;
const delUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const deletedUser = yield Register_1.default.findOneAndDelete({ email: user.email });
        if (!deletedUser) {
            return res.status(401).json({ msg: "User Not Found" });
        }
        res.status(200).json({ msg: "User deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error", error });
    }
});
exports.delUser = delUser;
