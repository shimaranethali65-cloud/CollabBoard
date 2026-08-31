"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const project_1 = __importDefault(require("../models/project"));
const projects_1 = require("../data/projects");
const connectDatabase = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not configured");
    }
    const connection = await mongoose_1.default.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    const legacyProjects = await project_1.default.collection
        .find({ members: { $type: "string" } })
        .toArray();
    await Promise.all(legacyProjects.map((project) => {
        const sampleProject = projects_1.projects.find((candidate) => candidate.name === project.name);
        const members = sampleProject
            ? sampleProject.members.map((member) => ({ ...member }))
            : project.members.map((member) => typeof member === "string"
                ? { name: member, email: "", role: "Member" }
                : member);
        return project_1.default.collection.updateOne({ _id: project._id }, { $set: { members } });
    }));
    if (await project_1.default.countDocuments() === 0) {
        await project_1.default.insertMany(projects_1.projects.map(({ id: _id, ...project }) => project));
        console.log("Sample projects added to MongoDB");
    }
};
exports.default = connectDatabase;
