import { INode, NodeModel } from "./models/node.js";
import { MongoSingleton, MongoInstance } from "./mongodb.js";

export class DBGraph {
  private mongo: MongoInstance;
  private initialized = false;

  constructor() {
    this.mongo = MongoSingleton.getInstance();
  }

  async initialize() {
    await this.mongo.initialize();
    this.initialized = true;
  }

  async addNode(node: INode) {
    const nodeModel = new NodeModel(node);
    const existing = await NodeModel.findOne({ title: node.title });
    if (existing) {
      //console.warn(`node with title ${node.title} already exists, skipping`);
      return;
    }

    await nodeModel.save(); // TODO: dedupe on name
  }

  async size() {
    return await NodeModel.countDocuments();
  }
}
