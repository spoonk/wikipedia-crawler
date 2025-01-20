import { useEffect, useState } from "react";

export function useMetricHistory(metric: number) {
  const [data, setData] = useState<number[]>([0]);

  useEffect(() => {
    setData([...data, metric].slice(-50));
  }, [metric]);
  return data;
}
