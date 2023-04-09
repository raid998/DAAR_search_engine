import { Router } from "express";
import searchRoute from "./search.route";
const router = Router();

router.use("/search", searchRoute);

export default router;
