// high level file to test out behavior

import { connect } from "mongoose";
import { NodeModel } from "./packages/database/models/node";

(async () => {
  await connect("mongodb://127.0.0.1:27017/wiki-crawler");

  const node = new NodeModel({ title: "help", outgoingPages: ["1", "2", "3"] });
  await node.save();
  console.log("done!");

  const help = await NodeModel.find();
  console.log(help);
})();
