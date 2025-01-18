// high level file to test out behavior
import { WikipediaCrawler } from "./crawler/crawler";

(async () => {
  const crawler = new WikipediaCrawler();
  await crawler.initialize();
  for (let i = 0; i < 5; i++) {
    await crawler.step();
    console.log(crawler.getMetrics());
  }
})();
