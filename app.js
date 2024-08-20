const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(bodyParser.json());
app.use("/api/v1", userRoutes);

app.use("*", (req, res) => {
  return res.status(404).json({
    status: "fail",
    message: "this recourse is not found",
  });
});
app.use((err, req, res, next) => {
  res.status().json({
    status: "error",
    message: err.message,
  });
});
app.listen(5000, () => {
  console.log("server is running ");
});
