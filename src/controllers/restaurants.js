import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/restaurants.json");

export const getAllRestaurants = async (req, res) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");

    const restaurants = JSON.parse(data);

    const restaurantList = { restaurants: [] };
    for (const res of restaurants) {
      restaurantList.restaurants.push(res);
    }
    res.json(restaurantList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading file");
  }
};

export const getRestaurantByQuery = async (req, res) => {
  const { name, address, phone } = req.query;

  const data = await fs.promises.readFile(filePath, "utf-8");

  const restaurants = JSON.parse(data);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    return (
      (name && restaurant.name.includes(name)) ||
      (address && restaurant.address.includes(address)) ||
      (phone && restaurant.phone.includes(phone))
    );
  });

  console.log(filteredRestaurants);

  const result =
    filteredRestaurants.length > 0
      ? filteredRestaurants[0]
      : { error: "해당 맛집 정보가 존재하지 않습니다." };
  res.json(result);
};

export const createRestaurant = async (req, res) => {
  const { name, address, phone } = req.body;

  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const restaurants = JSON.parse(data);
    const filteredRestaurants = restaurants.filter((restaurant) => {
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

    restaurants.push(newRestaurant);
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(restaurants, null, 2),
      "utf-8"
    );

    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading file");
  }
};

export const deleteRestaurant = async (req, res) => {
  const { name, address, phone } = req.body;

  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const restaurants = JSON.parse(data);

    const filteredRestaurants = restaurants.filter((restaurant) => {
      return !(
        (name && restaurant.name.includes(name)) ||
        (address && restaurant.address.includes(address)) ||
        (phone && restaurant.phone.includes(phone))
      );
    });

    if (filteredRestaurants.length === restaurants.length) {
      return res
        .status(404)
        .json({ error: "해당 맛집 정보가 존재하지 않습니다." });
    }

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(filteredRestaurants, null, 2),
      "utf-8"
    );

    res.status(200).json({ message: "맛집 정보가 성공적으로 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading file");
  }
};

export const updateRestaurant = async (req, res) => {
  const { name, address, phone } = req.query;
  const { newName, newAddress, newPhone } = req.body;

  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const restaurants = JSON.parse(data);

    const restaurantIndex = restaurants.findIndex((restaurant) => {
      return (
        (name && restaurant.name.includes(name)) ||
        (address && restaurant.address.includes(address)) ||
        (phone && restaurant.phone.includes(phone))
      );
    });

    if (restaurantIndex === -1) {
      return res
        .status(404)
        .json({ error: "해당 맛집 정보가 존재하지 않습니다." });
    }

    if (newName) restaurants[restaurantIndex].name = newName;
    if (newAddress) restaurants[restaurantIndex].address = newAddress;
    if (newPhone) restaurants[restaurantIndex].phone = newPhone;
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(restaurants, null, 2),
      "utf-8"
    );

    res.status(200).json(restaurants[restaurantIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading file");
  }
};
