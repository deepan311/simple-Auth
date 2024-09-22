"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerController_1 = require("../Controllers/registerController");
const VerifyUser_1 = require("../Middleware/VerifyUser");
const router = express_1.default.Router();
router.post('/register', registerController_1.registerUsers);
router.get('/', VerifyUser_1.verifyUser, registerController_1.userData);
router.post('/login', registerController_1.login);
router.delete('/delete', VerifyUser_1.verifyUser, registerController_1.delUser);
exports.default = router;
