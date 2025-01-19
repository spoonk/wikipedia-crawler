import { useEffect, useRef } from "react";
import { WikipediaCrawler } from "../crawler/crawler.js";

export function useCrawler() {
  const crawler = useRef(new WikipediaCrawler());

  useEffect(() => {
    const step = async () => {
      await crawler.current.step();
      step();
    };

    const firstLoad = async () => {
      await crawler.current.initialize();
      step();
    };

    firstLoad();

    return () => {};
  }, []);
  return crawler;
}
