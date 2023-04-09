import { Router } from "express";
import { advancedSearch, simpleSearch } from "../services/search.service";
import { performance } from "perf_hooks";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const query = req.query.query;
    const type = req.query.type;
    if (type === "simple") {
      const startTime = performance.now();
      const documentIds = await simpleSearch(query as string);
      const endTime = performance.now();
      console.log(
        "simple search for " + query + " took " + (endTime - startTime) + "ms"
      );
      res.send(documentIds);
    } else {
      const startTime = performance.now();
      const books = await advancedSearch(query as string);
      const endTime = performance.now();
      console.log(
        "simple search for " + query + " took " + (endTime - startTime) + "ms"
      );
      res.send(books);
    }
  } catch (err) {
    console.log(err);

    res.status(404).send({ books: [], suggestion: [] });
  }
});

export default router;
