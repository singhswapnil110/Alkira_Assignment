import { useEffect } from "react";

export const useFetch = (url, options, type, dispatch) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const addedOptions = { ...options, signal };

  useEffect(() => {
    fetchData(url, addedOptions);
    return () => controller.abort();
  }, [url]);

  function fetchData(url, addedOptions) {
    if (url)
      fetch(url, options)
        .catch((err) => {
          setTimeout(() => fetchData(url, addedOptions), 1000);
          throw new Error(err);
        })
        .then((data) => data.json())
        .then((res) => dispatch({ payload: res, type: type }));
  }
};
