import { Router } from "express";
import { advancedSearch, simpleSearch } from "../services/search.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const query = req.query.query;
    const type = req.query.type;
    if (type === "simple") {
      const documentIds = await simpleSearch(query as string);
      res.send(documentIds);
    } else {
      const books = await advancedSearch(query as string);
      res.send(books);
    }
  } catch (err) {
    console.log(err);

    res.status(404).send([]);
  }
});

export default router;
