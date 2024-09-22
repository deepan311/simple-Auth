"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./DB/connection");
const body_parser_1 = __importDefault(require("body-parser"));
const allinOneRouter_1 = __importDefault(require("./Routers/allinOneRouter"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
app.use(body_parser_1.default.json()); // For parsing application/json
app.use(body_parser_1.default.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use((0, cors_1.default)());
app.use('/api', allinOneRouter_1.default);
(0, connection_1.connection)().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
