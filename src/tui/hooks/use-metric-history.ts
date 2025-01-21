import { useEffect, useState } from "react";

export function useMetricHistory(metric: number | null, limit = 50) {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    if (!metric) return;
    setData([...data, metric].slice(0 - limit));
  }, [metric]);
  return data;
}
