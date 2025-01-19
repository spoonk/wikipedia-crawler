import delay from "delay";
import { getOutgoingPageTitles } from "../packages/apis/wikipedia-api.js";
import { DBGraph } from "../packages/database/db-graph.js";
import { DBQueue } from "../packages/database/db-queue.js";
import { DBSet } from "../packages/database/db-set.js";
import { INode } from "../packages/database/models/node.js";
import { CrawlerMetrics } from "./crawler-metrics.js";
import * as bb from "bluebird";
import { MetricPubSub } from "../packages/utils/metric-pub-sub.js";
import _ from "lodash";

export class WikipediaCrawler {
  private queue: DBQueue;
  private graph: DBGraph;
  private set: DBSet;

  private metrics: CrawlerMetrics;

  constructor() {
    this.queue = new DBQueue();
    this.graph = new DBGraph();
    this.set = new DBSet();
    this.metrics = {
      queueSize: -1,
      numProcessedPages: -1,
    };
  }

  async initialize() {
    await this.queue.initialize();
    await this.graph.initialize();
    await this.set.initialize();
    await this.syncMetrics();

    // add seed item if queue empty
    if (!(await this.set.contains("Albert Einstein"))) {
      await this.queue.push({ title: "Albert Einstein" });
    }
  }

  async step() {
    const { title } = await this.queue.pop();

    const outgoing = await getOutgoingPageTitles(title);
    await delay(1.2 * 1000);
    const node: INode = { title, outgoingPages: outgoing };

    for (const page of outgoing) {
      if (await this.set.contains(page)) continue;
      await this.queue.push({ title: page });
    }
    await this.graph.addNode(node);
    await this.set.addItem({ title });
    await this.syncMetrics();
  }

  getMetrics() {
    return this.metrics;
  }

  private async syncMetrics() {
    this.metrics = {
      queueSize: await this.queue.size(),
      numProcessedPages: await this.graph.size(),
    };
    MetricPubSub.pushMetrics(this.metrics);
  }
}
