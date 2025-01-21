import React from "react";
import { render } from "ink";
import { Dashboard } from "./components/dashboard.js";
import { useCrawler } from "./hooks/use-crawler.js";

const App = () => {
  useCrawler();
  return <Dashboard />;
};

render(<App />);
