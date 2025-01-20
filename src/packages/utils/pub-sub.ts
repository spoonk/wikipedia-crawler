import _ from "lodash";
export class PubSub<T> {
  private subscriptions: ((item: T) => void)[] = [];

  pushItem(item: T) {
    _.forEach(this.subscriptions, (fn) => fn(_.clone(item)));
  }

  subscribe(callback: (item: T) => void) {
    this.subscriptions.push(callback);
  }
}
