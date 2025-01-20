import { useEffect, useState } from "react";

export function useMetricHistory(metric: number | null) {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    if (!metric) return;
    setData([...data, metric].slice(-20));
  }, [metric]);
  return data;
}
