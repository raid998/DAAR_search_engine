import { Worker, isMainThread } from "worker_threads";
import { getBooks } from "./utils/getBooks";
import { performance } from "perf_hooks";

export const fillDB = async () => {
  const startTime = performance.now();
  await getBooks();
  const endTime = performance.now();
  console.log(
    "Total Execution Time: " + (endTime - startTime).toFixed(3) + "ms"
  );
};
