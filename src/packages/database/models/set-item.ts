import { model, Schema } from "mongoose";

export type SetItem = {
  title: string;
};

const setItemSchema = new Schema<SetItem>(
  {
    title: { type: String, required: true },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } },
);

export const SetItemModel = model<SetItem>("SetItem", setItemSchema);
