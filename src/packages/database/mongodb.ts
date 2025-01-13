import { connect, Mongoose } from "mongoose";

const MONGO_PATH = "mongodb://127.0.0.1:27017/wiki-crawler";

export class MongoInstance {
  private initialized = false;
  private mongoose: undefined | Mongoose;

  async initialize() {
    if (this.initialized) {
      console.warn("mongo instance already connected");
      return;
    }

    this.mongoose = await connect(MONGO_PATH);
    this.initialized = true;
  }

  async getMongoose() {
    return this.mongoose;
  }
}

export class MongoSingleton {
  private static instance: MongoInstance | undefined;

  static getInstance(): MongoInstance {
    if (!MongoSingleton.instance) {
      MongoSingleton.instance = new MongoInstance();
    }

    return MongoSingleton.instance;
  }
}
