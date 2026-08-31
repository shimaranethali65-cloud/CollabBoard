import { InferSchemaType, model, Schema } from "mongoose";

const memberSchema = new Schema({ name: { type: String, required: true, trim: true }, email: { type: String, default: "", trim: true, lowercase: true }, role: { type: String, default: "Member", trim: true } }, { _id: false });
const projectSchema = new Schema({ name: { type: String, required: true, trim: true }, description: { type: String, required: true, trim: true }, status: { type: String, required: true, trim: true }, members: { type: [memberSchema], default: [] } }, { timestamps: true });

export type ProjectDocument = InferSchemaType<typeof projectSchema>;
export default model<ProjectDocument>("Project", projectSchema);
