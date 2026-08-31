"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    role: { type: String, trim: true, default: "Member" },
}, { _id: false });
const projectSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    members: { type: [memberSchema], required: true, default: [] },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Project", projectSchema);
