"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canEditIdea = exports.canBlockIdeas = void 0;
const hasPermission = (user, permission) => {
    return ((user === null || user === void 0 ? void 0 : user.permissions.includes(permission)) ||
        (user === null || user === void 0 ? void 0 : user.permissions.includes('ALL')) ||
        false);
};
const canBlockIdeas = (user) => {
    return hasPermission(user, 'BLOCK_IDEAS');
};
exports.canBlockIdeas = canBlockIdeas;
const canEditIdea = (user, idea) => {
    return !!user && !!idea && (user === null || user === void 0 ? void 0 : user.id) === (idea === null || idea === void 0 ? void 0 : idea.authorId);
};
exports.canEditIdea = canEditIdea;
//# sourceMappingURL=can.js.map