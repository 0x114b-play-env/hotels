import mongoose from "mongoose";

mongoose.connect(process.env.MONGOURL_CLUSTER);

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Connected to MongoDB server!\nDB HOST: ${db.host}`);
});

db.on("error", (err) => {
  console.error(`MongoDB connection error!\n ERROR: ${err}`);
  process.exit(1);
});

db.on("disconnected", () => {
  console.log(`MongoDB server disconnected!`);
  //   process.exit(0);
});

export default db;
