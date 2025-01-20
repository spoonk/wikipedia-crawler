import delay from "delay";
import { getOutgoingPageTitles } from "../packages/apis/wikipedia-api.js";
import { DBGraph } from "../packages/database/db-graph.js";
import { DBQueue } from "../packages/database/db-queue.js";
import { DBSet } from "../packages/database/db-set.js";
import { INode } from "../packages/database/models/node.js";
import { CrawlerMetrics } from "../packages/utils/metrics/crawler-metrics.js";
import { timedFunction } from "../packages/utils/timed-fn.js";
import { channels } from "../packages/utils/channels.js";
import { PageUpdate } from "../packages/utils/metrics/page-updates.js";

export class WikipediaCrawler {
  private queue: DBQueue;
  private graph: DBGraph;
  private set: DBSet; // note: set is redundant, could just check DBGraph for what is 'seen'

  private metrics: CrawlerMetrics;

  constructor() {
    this.queue = new DBQueue();
    this.graph = new DBGraph();
    this.set = new DBSet();
    this.metrics = {
      title: "",
      numOutgoingPages: 0,
      queueSize: -1,
      numProcessedPages: -1,
    };
  }

  async initialize() {
    await this.queue.initialize();
    await this.graph.initialize();
    await this.set.initialize();
    await this.syncMetrics("", 0);

    // add seed item if queue empty
    if (!(await this.set.contains("Albert Einstein"))) {
      await this.queue.push({ title: "Albert Einstein" });
    }
  }

  private async pushQueueItems(outgoing: string[]) {
    const pageUpdates: PageUpdate[] = [];
    for (const page of outgoing) {
      if (await this.set.contains(page)) {
        pageUpdates.push({ title: page, isNew: false });
        continue;
      }
      await this.queue.push({ title: page });
      pageUpdates.push({ title: page, isNew: true });
    }
    channels.lastPages.pushItem(pageUpdates);
  }

  timedPushQueueItems = timedFunction(
    this.pushQueueItems.bind(this),
    channels.addToQueueTiming,
  );

  async step() {
    const { title } = await this.queue.peek();

    const outgoing = await getOutgoingPageTitles(title);
    //await delay(0.1 * 1000); // prevent API spam (limit 200 requests / second, probably)
    const node: INode = { title, outgoingPages: outgoing };

    await this.timedPushQueueItems(outgoing);

    await this.graph.addNode(node);
    await this.queue.delete(title);
    await this.set.addItem({ title });

    await this.syncMetrics(title, outgoing.length);
  }

  getMetrics() {
    return this.metrics;
  }

  private async syncMetrics(title: string, numOutgoingPages: number) {
    this.metrics = {
      title,
      numOutgoingPages,
      queueSize: await this.queue.size(),
      numProcessedPages: await this.graph.size(),
    };
    channels.metrics.pushItem(this.metrics);
  }
}
