import { model, Schema } from "mongoose";

export type QueueItem = {
  title: string;
};

const queueItemSchema = new Schema<QueueItem>(
  {
    title: { type: String, required: true },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } },
);

export const QueueItemModel = model<QueueItem>("QueueItem", queueItemSchema);
