const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:8082", 
    credentials: true, 
  })
);
app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
