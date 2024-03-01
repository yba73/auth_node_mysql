const db = require("../models");

const { valdiateUpdatedUser } = require("../utils/validations/users.schema");

/**
 * @desc get user by id
 * @params GET /api/v1/users/:id
 * @access PRIVATE  (user logged in)
 **/
exports.getUser = async (req, res) => {
  try {
    // get user by id
    const user = await db.User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] }, // get all column exclude password
    });
    if (!user)
      return res
        .status(404)
        .json({ message: "invalid id, account not found", status: "fail" });
    // send response from server to the client
    return res.status(200).json({
      message: "user has been getting successfully",
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`get user ${error}`);
  }
};
/**
 * @desc get user all users
 * @params GET /api/v1/admin/users
 * @access PRIVATE  (only admin)
 **/
exports.getUsers = async (req, res) => {
  try {
    // get all users
    const users = await db.User.findAll();
    // send response (users)
    return res.status(200).json({
      message: "users have been getting successfully",
      status: "success",
      data: { users },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`get user ${error}`);
  }
};
/**
 * @desc update user info by id
 * @params PUT /api/v1/users/:id
 * @access PRIVATE owner of this account
 **/
exports.updateUser = async (req, res) => {
  try {
    // destructuring req.body
    const { username, workplace, profile } = req.body;
    // check if user exists or not
    const existUser = await db.User.findByPk(req.params.id); // check id
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "user id undefined", status: "fail" });
    }

    if (!existUser) return res.status(404).json({ message: "user not found" });
    // check owner of this account
    const checkOwner = req.userId === parseInt(req.params.id);

    if (!checkOwner)
      return res.status(401).json({
        message: "authorized, you are not the owner of this account",
        status: "fail",
      });
    // Validating input data from client (body)
    const { error } = valdiateUpdatedUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    await db.User.update(
      {
        username,
        workplace,
        profile,
      },
      { where: { id: req.params.id } }
    );
    // send response from server to the client
    return res
      .status(200)
      .json({ message: "user has updated successfully", status: "sucess" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`add profil photo error is ${error}`);
  }
};

/**
 * @desc delete user account by id
 * @params DELETE /api/v1/users/:id
 * @access PRIVATE owner of this account
 **/
exports.deleteUser = async (req, res) => {
  try {
    // check if user exists or not
    const existUser = await db.User.findByPk(req.params.id);
    if (!existUser)
      return res
        .status(404)
        .json({ message: "user not found", status: "fail" });
    // check owner of this account
    const checkOwner = req.userId === parseInt(req.params.id);
    if (!checkOwner)
      return res.status(401).json({
        message: "authorized, you are not the owner of this compte",
        status: "fail",
      });
    await db.User.destroy({
      where: { id: req.params.id },
    });
    // send message to the client
    return res.status(200).json({
      message: "account has been deleted successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`error deleteUser  user is ${error}`);
  }
};

/**
 * @desc delete user account by id
 * @params DELETE /api/v1/users/:id
 * @access PRIVATE owner of this account and admin
 **/
exports.deleteUserByAdmin = async (req, res) => {
  try {
    // check if user exists or not
    const existUser = await db.User.findByPk(req.params.id);
    if (!existUser) return res.status(404).json({ message: "user not found" });
    // check owner of this compte or you are admin
    await db.User.destroy({
      where: { id: req.params.id },
    });
    // send message to the client
    return res
      .status(200)
      .json({ message: "account has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`error deleteUser  user is ${error}`);
  }
};
