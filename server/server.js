const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const router = require("./routers/home.router");
const errHandle = require("./middlewares/handle.error.middleware");
const URL = `mongodb://${process.env.DB_HOST}:27017/kudos_db`;
// console.log(URL);
const PORT = process.env.PORT_SERVER || 5000;
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json());

router(app);

app.use(errHandle.errHandle);
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server start with ${PORT} port.`));
  })
  .catch((err) => {
    console.log("Cannot connect to DB + " + err);
    process.exit(1);
  });
