const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const usercontroller = require("./controllers/userController");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

// Public routes

app.post("/user", hashPassword, usercontroller.add);

//create token
app.post("/login", usercontroller.read, verifyPassword);

// Protected routes token require on the request

app.use(verifyToken);

app.get("/user", usercontroller.getUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
