import delay from "delay";
import { getOutgoingPageTitles } from "../packages/apis/wikipedia-api";
import { DBGraph } from "../packages/database/db-graph";
import { DBQueue } from "../packages/database/db-queue";
import { DBSet } from "../packages/database/db-set";
import { INode } from "../packages/database/models/node";

export class WikipediaCrawler {
  private queue: DBQueue;
  private graph: DBGraph;
  private set: DBSet;

  constructor() {
    this.queue = new DBQueue();
    this.graph = new DBGraph();
    this.set = new DBSet();
  }

  async initialize() {
    await this.queue.initialize();
    await this.graph.initialize();
    await this.set.initialize();

    // add seed item if queue empty
    if (!(await this.set.contains("Albert Einstein"))) {
      await this.queue.push({ title: "Albert Einstein" });
    }
  }

  async step() {
    const { title } = await this.queue.pop();
    console.log(`querying pages for ${title}`);

    const outgoing = await getOutgoingPageTitles(title);

    await delay(5 * 1000); // delay 5s to further reduce api spam
    const node: INode = { title, outgoingPages: outgoing };

    for (const page of outgoing) {
      if (await this.set.contains(page)) continue;
      await this.queue.push({ title: page });
    }

    await this.graph.addNode(node);
    await this.set.addItem({ title });
  }
}
