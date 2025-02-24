const logger = require("./util/logger");
const morgan = require("morgan");

const express = require("express");
const path = require("path");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();
require("./config/db");
require("./scheduler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
const morganFormat = ":method :url :status :response-time ms";

app.use(
  cors({
    origin: ["http://localhost:8082", "http://localhost:8081"],
    credentials: true,
  })
);

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
