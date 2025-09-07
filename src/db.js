import mongoose from "mongoose";

const mongoURL = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(mongoURL, {
  //   useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
