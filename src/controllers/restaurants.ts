import { Restaurant } from "../dto/restaurants.types.js";
import { Restaurants } from "../dto/restaurants.js";
import { Request, Response } from "express";

export const getAllRestaurants = (req: Request, res: Response) => {
  try {
    const restaurantList = { Restaurants: [] as Restaurant[] };

    for (const res of Restaurants) {
      restaurantList.Restaurants.push(res);
    }
    res.json(restaurantList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading file");
  }
};

export const getRestaurantByQuery = (req: Request, res: Response) => {
  const { name, address, phone } = req.query;

  const filteredRestaurants = Restaurants.filter((restaurant) => {
    return (
      (name && restaurant.name === name) ||
      (address && restaurant.address === address) ||
      (phone && restaurant.phone === phone)
    );
  });

  console.log(filteredRestaurants);

  const result =
    filteredRestaurants.length > 0
      ? filteredRestaurants[0]
      : { error: "해당 맛집 정보가 존재하지 않습니다." };
  res.json(result);
};

export const createRestaurant = (req: Request, res: Response) => {
  const { name, address, phone } = req.body as Restaurant;

  try {
    const filteredRestaurants = Restaurants.filter((restaurant) => {
      return (
        (name && restaurant.name.includes(name)) ||
        (address && restaurant.address.includes(address)) ||
        (phone && restaurant.phone.includes(phone))
      );
    });

    if (filteredRestaurants.length > 0) {
      return res
        .status(400)
        .json({ error: "이미 해당 맛집 정보가 존재합니다." });
    }

    const newRestaurant = { name, address, phone };

    Restaurants.push(newRestaurant);

    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading file");
  }
};

export const deleteRestaurant = (req: Request, res: Response) => {
  const { name, address, phone } = req.query;

  try {
    const restaurantIndex = Restaurants.findIndex((restaurant) => {
      return (
        (name && restaurant.name === name) ||
        (address && restaurant.address === address) ||
        (phone && restaurant.phone === phone)
      );
    });

    if (restaurantIndex === -1) {
      return res
        .status(404)
        .json({ error: "해당 맛집 정보가 존재하지 않습니다." });
    }

    Restaurants.splice(restaurantIndex, 1);

    res.status(200).json({ message: "맛집 정보가 성공적으로 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading file");
  }
};

export const updateRestaurant = (req: Request, res: Response) => {
  const { name, address, phone } = req.query;
  const { newName, newAddress, newPhone } = req.body;

  try {
    const restaurantIndex = Restaurants.findIndex((restaurant) => {
      return (
        (name && restaurant.name === name) ||
        (address && restaurant.address === address) ||
        (phone && restaurant.phone === phone)
      );
    });

    if (restaurantIndex === -1) {
      return res
        .status(404)
        .json({ error: "해당 맛집 정보가 존재하지 않습니다." });
    }

    if (newName) Restaurants[restaurantIndex].name = newName;
    if (newAddress) Restaurants[restaurantIndex].address = newAddress;
    if (newPhone) Restaurants[restaurantIndex].phone = newPhone;

    res.status(200).json(Restaurants[restaurantIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading file");
  }
};
