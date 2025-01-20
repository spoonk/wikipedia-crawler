import { NodeModel } from "./packages/database/models/node.js";
import { MongoSingleton } from "./packages/database/mongodb.js";

(async () => {
  const mongo = MongoSingleton.getInstance();
  await mongo.initialize();

  const documents = await NodeModel.find({
    $or: [{ title: "Albert Einstein" }, { title: "Adolf Hitler" }],
  });
  //console.log(documents.length);
})();
