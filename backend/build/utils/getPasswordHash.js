"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasswordHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../lib/env");
const getPasswordHash = (password) => {
    return crypto_1.default
        .createHash('sha256')
        .update(`${env_1.env.PASSWORD_SALT}${password}`)
        .digest('hex');
};
exports.getPasswordHash = getPasswordHash;
//# sourceMappingURL=getPasswordHash.js.map