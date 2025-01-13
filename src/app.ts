// high level file to test out behavior
import { DBQueue } from "./packages/database/db-queue";

(async () => {
  const queue = new DBQueue();
  await queue.initialize();

  await queue.push({ title: "Albert Einstein" });

  const out = await queue.peek();
  console.log(out);
})();
