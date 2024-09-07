require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const prisma = require("./prisma");
const Sentry = require("./utils/sentry");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(Sentry.Handlers.requestHandler());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./routes/index"));
app.use("/transaction", require("./routes/transaction"));

app.use(Sentry.Handlers.errorHandler());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
