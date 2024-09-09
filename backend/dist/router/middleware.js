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
    console.log("Incoming Authorization header:", authHeader); // Log the incoming token
    if (!authHeader) {
        console.log("No token provided!"); // Log if no token is provided
        return res.status(403).json({ message: "Token not provided!" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authHeader, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Log the decoded token
        //@ts-ignore
        if (decoded.userId) {
            //@ts-ignore
            req.userId = decoded.userId;
            //@ts-ignore
            console.log("User authenticated with ID:", req.userId); // Log authenticated userId
            return next();
        }
        else {
            console.log("Invalid token!"); // Log invalid token case
            return res.status(403).json({
                message: "Invalid token!",
            });
        }
    }
    catch (e) {
        console.error("Error verifying token:", e.message); // Log any token verification errors
        return res.status(403).json({
            message: "You are not logged in",
        });
    }
}
exports.middleware = middleware;
