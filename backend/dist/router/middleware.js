"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function middleware(req, res, next) {
    var _a;
    const authHeader = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : "";
    if (!authHeader) {
        return res.status(403).json({ message: "Token not provided!" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authHeader, process.env.JWT_SECRET);
        //@ts-ignore
        if (decoded.userId) {
            //@ts-ignore
            req.userId = decoded.userId;
            return next();
        }
        else {
            return res.status(403).json({
                message: "Invalid token!",
            });
        }
    }
    catch (e) {
        return res.status(403).json({
            message: "You are not logged in",
        });
    }
}
exports.middleware = middleware;
