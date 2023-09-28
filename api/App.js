require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cookieParser({ verify: false })); // verify :false
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use("/api/v1", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Server and DB are online and active at PORT = ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
