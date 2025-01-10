// high level file to test out behavior

import { connect } from "mongoose";
//import { getOutgoingPageTitles } from "./packages/apis/wikipedia-api";
import { NodeModel } from "./packages/database/models/node";

(async () => {
  //const d = await getOutgoingPageTitles("Minecraft");
  //console.log(d);
  await connect("mongodb://127.0.0.1:27017/wiki-crawler");

  const node = new NodeModel({ title: "help", outgoingPages: ["1", "2", "3"] });
  await node.save();
  console.log("done!");
})();
