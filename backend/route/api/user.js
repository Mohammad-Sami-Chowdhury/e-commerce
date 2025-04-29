const express = require("express");
const {
  getAllUsersController,
  updateUserRoleController,
  deleteUserController
} = require("../../controller/registrationController");
const route = express.Router();

route.get("/getallusers", getAllUsersController);
route.patch("/updateuserrole", updateUserRoleController);
route.delete("/deleteuser/:userId", deleteUserController);

module.exports = route;
