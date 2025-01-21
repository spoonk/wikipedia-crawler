import { model, Schema } from "mongoose";

export interface Node {
  title: string;
  outgoingPages: string[];
}

const nodeSchema = new Schema<Node>(
  {
    title: { type: String, required: true },
    outgoingPages: { type: [String], required: false, default: [] },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } },
);

export const NodeModel = model<Node>("Node", nodeSchema);
