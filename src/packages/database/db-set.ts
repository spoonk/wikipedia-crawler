import { SetItemModel, SetItem } from "./models/set-item.js";
import { MongoSingleton, MongoInstance } from "./mongodb.js";

export class DBSet {
  private mongo: MongoInstance;

  constructor() {
    this.mongo = MongoSingleton.getInstance();
  }

  async initialize() {
    await this.mongo.initialize();
  }

  async contains(title: string) {
    const existing = await SetItemModel.findOne({ title });
    return !!existing;
  }

  async addItem(setItem: SetItem) {
    if (await this.contains(setItem.title)) {
      return;
    }

    new SetItemModel(setItem).save();
  }
}
