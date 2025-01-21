import { Node, NodeModel } from "./models/node.js";
import { MongoSingleton, MongoInstance } from "./mongodb.js";

export class DBGraph {
  private mongo: MongoInstance;

  constructor() {
    this.mongo = MongoSingleton.getInstance();
  }

  async initialize() {
    await this.mongo.initialize();
  }

  async addNode(node: Node) {
    const nodeModel = new NodeModel(node);
    const existing = await NodeModel.findOne({ title: node.title });
    if (existing) {
      return;
    }

    await nodeModel.save();
  }

  async size() {
    return await NodeModel.countDocuments();
  }
}
