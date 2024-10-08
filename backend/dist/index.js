"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_1 = __importDefault(require("./router/main"));
const space_1 = __importDefault(require("./router/space"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/main", main_1.default);
app.use("/api/space", space_1.default);
app.listen(3000, () => {
    console.log("Server running on 3000");
});
