import { QueueItem, QueueItemModel } from "./models/queue-item";
import { MongoInstance, MongoSingleton } from "./mongodb";

export class DBQueue {
  private mongo: MongoInstance;
  private initialized = false;

  constructor() {
    this.mongo = MongoSingleton.getInstance();
  }

  async size() {
    await QueueItemModel.countDocuments();
  }

  async initialize() {
    await this.mongo.initialize();
    this.initialized = true;
  }

  async push(item: QueueItem) {
    const queueItem = new QueueItemModel(item);

    const existing = await QueueItemModel.findOne({ title: item.title });
    if (existing !== null) {
      console.warn(`skipping adding duplicate queue item ${item.title}`);
      return;
    }

    await queueItem.save();
  }

  async peek() {
    return this.getNext();
  }

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
