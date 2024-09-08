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
const client_1 = require("@prisma/client");
const web3_js_1 = require("@solana/web3.js");
const express_1 = require("express");
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { signature, publicKey } = req.body;
    if (!signature || !publicKey) {
        return res.status(401).json({ message: "Invalid inputs" });
    }
    const message = new TextEncoder().encode("Welcome to SolTune! Connect your wallet to join the beat of music.");
    const result = tweetnacl_1.default.sign.detached.verify(message, new Uint8Array(signature.data), new web3_js_1.PublicKey(publicKey).toBytes());
    if (!result) {
        return res.status(401).json({ message: "Invalid signature" });
    }
    const existingUser = yield prisma.user.findFirst({
        where: {
            address: publicKey,
        },
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            userId: existingUser.id,
        }, process.env.JWT_SECRET);
        res.json({ token });
    }
    else {
        const user = yield prisma.user.create({
            data: {
                address: publicKey,
            },
        });
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
        }, process.env.JWT_SECRET);
        res.json({ token });
    }
}));
exports.default = router;
