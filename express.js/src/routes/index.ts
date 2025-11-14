import { Router } from "express";
import restaurantsRouter from "./restaurants.js";

const router = Router();

router.use("/restaurants", restaurantsRouter);

export default router;
