// executes function, pushes timing to some pubsub

/* eslint-disable @typescript-eslint/no-explicit-any */
import { PubSub } from "./pub-sub";

export function timedFunction<F extends (...args: any[]) => any>(
  fn: F,
  channel: PubSub<number>,
): F {
  return <F>async function (...args: any[]) {
    const start = performance.now();

    const result = await fn(...args);

    const end = performance.now();

    channel.pushItem(end - start);
    return result;
  };
}
