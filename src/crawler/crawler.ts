import { getOutgoingPageTitles } from "../packages/apis/wikipedia-api.js";
import { DBGraph } from "../packages/database/db-graph.js";
import { DBQueue } from "../packages/database/db-queue.js";
import { DBSet } from "../packages/database/db-set.js";
import { Node } from "../packages/database/models/node.js";
import { CrawlerMetrics } from "../packages/utils/messages/crawler-metrics.js";
import { timedFunction } from "../packages/utils/timed-fn.js";
import { channels } from "../packages/utils/channels.js";
import { PageUpdate } from "../packages/utils/messages/page-updates.js";

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
      title: null,
      numOutgoingPages: null,
      queueSize: null,
      numProcessedPages: null,
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
    const node: Node = { title, outgoingPages: outgoing };

    await this.timedPushQueueItems(outgoing);

    await this.graph.addNode(node);
    await this.queue.delete(title);
    await this.set.addItem({ title });

    await this.syncMetrics(title, outgoing.length);
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
