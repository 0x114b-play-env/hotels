import express from "express";
import db from "./src/db.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.listen(8000, () => {
  console.log("Server is running");
});

app.get("/", (req, res) => {
  res.send("response is sent.");
});

// routes or routers import
import personRouter from "./src/routes/person.routes.js";
import menuItemsRouter from "./src/routes/menuItems.routes.js";

// routes declaration
app.use("/person", personRouter);
app.use("/menu", menuItemsRouter);
