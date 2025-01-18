import { QueueItem, QueueItemModel } from "./models/queue-item";
import { MongoInstance, MongoSingleton } from "./mongodb";

export class DBQueue {
  private mongo: MongoInstance;
  private initialized = false;

  constructor() {
    this.mongo = MongoSingleton.getInstance();
  }

  async size() {
    return await QueueItemModel.countDocuments();
  }

  async initialize() {
    await this.mongo.initialize();
    this.initialized = true;
  }

  async contains(title: string) {
    const existing = await QueueItemModel.findOne({ title });
    return existing !== null;
  }

  async push(item: QueueItem) {
    const queueItem = new QueueItemModel(item);
    if (await this.contains(item.title)) {
      console.warn(`skipping adding duplicate queue item ${item.title}`);
      return;
    }

    await queueItem.save();
  }

  async peek() {
    return this.getNext();
  }

  // NOTE: should not use pop since it's not
  //  crash safe. Final version should use a peek + delete separately
  async pop(): Promise<QueueItem> {
    const item = await this.getNext();

    await QueueItemModel.findByIdAndDelete(item._id);

    return item;
  }

  private async getNext() {
    const item = await QueueItemModel.findOne();

    if (!item) throw new Error("out of queue items!");
    return item;
  }
}
