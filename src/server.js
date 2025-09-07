import express from "express";
import db from "./db.js";

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
import personRouter from "./routes/person.routes.js";
import menuItemsRouter from "./routes/menuItems.routes.js";

// routes declaration
app.use("/person", personRouter);
app.use("/menu", menuItemsRouter);
