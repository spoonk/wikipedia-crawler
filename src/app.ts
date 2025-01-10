// high level file to test out behavior

import { getOutgoingPageTitles } from "./packages/apis/wikipedia-api";

(async () => {
  const d = await getOutgoingPageTitles("Minecraft");
  console.log(d);
})();
