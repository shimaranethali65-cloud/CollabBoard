import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  status: string;
  members: string[];
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    members: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);