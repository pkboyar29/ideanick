"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toClientMe = void 0;
const lodash_1 = __importDefault(require("lodash"));
const toClientMe = (user) => {
    return user && lodash_1.default.pick(user, ['id', 'nick', 'name', 'permissions']);
};
exports.toClientMe = toClientMe;
//# sourceMappingURL=models.js.map