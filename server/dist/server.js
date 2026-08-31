"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await (0, database_1.default)();
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};
startServer().catch((error) => {
    console.error("Server startup failed:", error);
    process.exit(1);
});
