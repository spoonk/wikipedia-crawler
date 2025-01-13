import { INode, NodeModel } from "./models/node";
import { MongoSingleton, MongoInstance } from "./mongodb";

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
    await nodeModel.save();
  }
}
