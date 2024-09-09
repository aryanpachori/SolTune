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
const express_1 = require("express");
const middleware_1 = require("./middleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post("/create", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    console.log(userId);
    const { name, amount } = req.body;
    // Validate inputs
    if (!name || !amount) {
        return res.status(400).json({ message: "Invalid inputs" });
    }
    try {
        const newSpace = yield prisma.space.create({
            data: {
                creatorId: userId,
                amount: amount,
                name: name,
            },
        });
        const joinLink = `http://localhost:3001/spaces/${newSpace.id}`;
        res.status(201).json({ space: newSpace, joinLink });
    }
    catch (e) {
        console.error("Error creating space:", e);
        res.status(500).json({ message: "Error creating space" });
    }
}));
exports.default = router;
