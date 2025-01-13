import { model, Schema } from "mongoose";

export interface INode {
  title: string;
  outgoingPages: string[];
}

const nodeSchema = new Schema<INode>(
  {
    title: { type: String, required: true },
    outgoingPages: { type: [String], required: false, default: [] },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } },
);

export const NodeModel = model<INode>("Node", nodeSchema);
