import { useEffect, useState } from "react";

export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const controller = new AbortController();
  const signal = controller.signal;
  const addedOptions = { ...options, signal };

  useEffect(() => {
    fetchData(url, addedOptions);
    return () => controller.abort();
  }, [url]);

  function fetchData(url, addedOptions) {
    fetch(url, options)
      .catch((err) => {
        setTimeout(() => fetchData(url, addedOptions), 1000);
        throw new Error(err);
      })
      .then((data) => data.json())
      .then((res) => setData(res));
  }

  return { ...data, setData, abort: () => controller.abort() };
};
