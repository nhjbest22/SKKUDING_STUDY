import { Router } from "express";
import {
  getAllRestaurants,
  getRestaurantByQuery,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from "../controllers/restaurants.js";

const router = Router();

router.get("/search", getRestaurantByQuery);
router.get("/", getAllRestaurants);
router.post("/", createRestaurant);
router.delete("/", deleteRestaurant);
router.patch("/", updateRestaurant);

export default router;
