const express = require("express");
const app = express();
app.use(express.urlencoded({ extends: true }));
app.use(express.json());
const db = require("./models");
const cors = require("cors");
app.use(cors());
// auth route
app.use("/api/v1/auth", require("./routes/auth.routes"));
// users route
app.use("/api/v1/users", require("./routes/users.routes"));

// admin route
app.use("/api/v1/admin", require("./routes/admin.routes"));

app.use("*", (req, res) => {
  return res.status(404).json({ message: "bad url, 404 Not Found" });
});

db.sequelize.sync({ alter: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server run on port ${process.env.PORT}`);
  });
});
