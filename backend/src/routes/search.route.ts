import { Router } from "express";
import { search } from "../services/search.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const query = req.query.query;
    const documentIds = await search(query as string);
    res.send(documentIds);
  } catch (err) {
    console.log(err);

    res.status(404).send([]);
  }
});

export default router;
