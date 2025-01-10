export type GraphNode = {
  title: string;
  outgoingPages: string[]; // todo: update to a mongo document id if that's the only way to query efficiently
  pageLink?: string;
};
