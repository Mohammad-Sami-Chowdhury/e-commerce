const express = require("express");
const {
  getAllUsersController,
  updateUserRoleController,
  deleteUserController,
  getSingleUserController
} = require("../../controller/registrationController");
const route = express.Router();

route.get("/getallusers", getAllUsersController);
route.patch("/updateuserrole", updateUserRoleController);
route.delete("/deleteuser/:userId", deleteUserController);
route.get("/getsingleuser/:userId", getSingleUserController)

module.exports = route;
