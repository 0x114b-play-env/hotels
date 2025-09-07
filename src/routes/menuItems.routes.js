import { Router } from "express";
import { MenuItem } from "../models/menuItem.model.js";
import mongoose, { mongo } from "mongoose";

const router = Router();

// router.post("/", async (req, res) => {
//   try {
//     const data = req.body;

//     const newMenu = new MenuItem(data);
//     const response = await newMenu.save();
//     console.log("menu data saved");
//     return res.status(200).json(response);
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ error: "Internal Server Error", message: error?.message });
//   }
// });

router
  .get("/", async (req, res) => {
    try {
      const data = await MenuItem.find().select(
        "name price taste is_drink ingredients num_sales"
      );

      console.log("menu data fetched");
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", message: error?.message });
    }
  })
  .post("/", async (req, res) => {
    try {
      const data = req.body;

      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log("menu data saved");
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", message: error?.message });
    }
  });

router.get("/:taste", async (req, res) => {
  try {
    let tasteType = req?.params?.taste?.toLowerCase();

    if (!["sweet", "sour", "spicy"].includes(tasteType)) {
      return res.status(400).json({ message: "Invalid taste type" });
    }

    tasteType = `${tasteType[0].toUpperCase()}${tasteType.slice(1)}`;

    const data = await MenuItem.find({ taste: tasteType }).select(
      "name price taste is_drink ingredients num_sales"
    );

    if (!data.length) {
      return res.status(404).json({ message: "No items found" });
    }

    console.log("menu data fetched");
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error?.message });
  }
});

router.put("/:menuItemId", async (req, res) => {
  try {
    const itemId = req.params?.menuItemId;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid Menu Item ID" });
    }

    const toUpdate = req.body;

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(itemId, toUpdate, {
      runValidators: true,
      new: true,
    });

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    return res.status(200).json({
      success: true,
      data: updatedMenuItem,
      message: "Menu item updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error?.message });
  }
});

export default router;
