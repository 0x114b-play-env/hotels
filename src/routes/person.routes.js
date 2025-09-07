import { Router } from "express";
import { Person } from "../models/person.model.js";
import mongoose, { mongo } from "mongoose";

const router = Router();

// router.post("/", async (req, res) => {
//   //   const { name, age, work, mobile, email, address, salary } = req.body;
//   //   const person = await Person.create({
//   //     name,
//   //     age,
//   //     work,
//   //     mobile,
//   //     email,
//   //     address,
//   //     salary,
//   //   });

//   //   if (!person) {
//   //     return res
//   //       .status(500)
//   //       .json({ message: "person creation failed", data: null, success: false });
//   //   }

//   //   const createdPerson = await Person.findById(person._id).select("-_id");

//   //   return res.status(200).json({
//   //     message: "person created successfully",
//   //     data: createdPerson,
//   //     success: true,
//   //   });

//   try {
//     const data = req.body;

//     const createdPerson = new Person(data);

//     const response = await createdPerson.save();

//     console.log("data saved");
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
      const data = await Person.find().select(
        "name age work mobile email address salary"
      );

      console.log("person data fetched");
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", message: error?.message });
    }
  })
  .post("/", async (req, res) => {
    //   const { name, age, work, mobile, email, address, salary } = req.body;
    //   const person = await Person.create({
    //     name,
    //     age,
    //     work,
    //     mobile,
    //     email,
    //     address,
    //     salary,
    //   });

    //   if (!person) {
    //     return res
    //       .status(500)
    //       .json({ message: "person creation failed", data: null, success: false });
    //   }

    //   const createdPerson = await Person.findById(person._id).select("-_id");

    //   return res.status(200).json({
    //     message: "person created successfully",
    //     data: createdPerson,
    //     success: true,
    //   });

    try {
      const data = req.body;

      const createdPerson = new Person(data);

      const response = await createdPerson.save();

      console.log("data saved");
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", message: error?.message });
    }
  });

router.get("/:work", async (req, res) => {
  try {
    const workType = req?.params?.work?.toLowerCase();

    if (!["manager", "waiter", "chef"].includes(workType)) {
      return res.status(400).json({ message: "Invalid work type" });
    }

    const data = await Person.find({ work: workType }).select(
      "name age work mobile email address salary"
    );

    if (!data.length) {
      return res.status(404).json({ message: "No persons found" });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error?.message });
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const userId = req?.params?.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const toUpdate = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(userId, toUpdate, {
      runValidators: true,
      new: true,
    });

    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    return res.status(200).json({ success: true, data: updatedPerson });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error?.message });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const userId = req?.params?.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const deletedPerson = await Person.findByIdAndDelete(userId);

    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Person deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error?.message });
  }
});

export default router;
