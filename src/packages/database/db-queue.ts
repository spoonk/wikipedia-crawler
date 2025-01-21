import { QueueItem, QueueItemModel } from "./models/queue-item.js";
import { MongoInstance, MongoSingleton } from "./mongodb.js";

export class DBQueue {
  // note: not including pop() since it shouldn't be used by the crawler
  //  a peek + some work + delete is a transaction-style pattern that makes the crawler resistant to crashes.
  //  If the crawler popped a node and then crashed without adding any new pages to the queue or the node to the graph, that node would be lost.
  //  If the crawler peeks and then crashes, it will be able to peek the same node when it recovers. All work done by the crawler is idempotent
  //    due to the deduplication on database puts, so it is fin for the recovering crawler executing the same work it did before it crashed.
  private mongo: MongoInstance;

  constructor() {
    this.mongo = MongoSingleton.getInstance();
  }

  async size() {
    return await QueueItemModel.countDocuments();
  }

  async initialize() {
    await this.mongo.initialize();
  }

  async contains(title: string) {
    const existing = await QueueItemModel.findOne({ title });
    return existing !== null;
  }

  async push(item: QueueItem) {
    const queueItem = new QueueItemModel(item);
    if (await this.contains(item.title)) {
      return;
    }

    await queueItem.save();
  }

  async peek() {
    return this.getNext();
  }

  async delete(title: string) {
    await QueueItemModel.findOneAndDelete({ title });
  }

  private async getNext() {
    const item = await QueueItemModel.findOne();

    if (!item) throw new Error("out of queue items!");
    return item;
  }
}
