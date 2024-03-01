const generateToken = require("../utils/generateToken");
const db = require("../models");
const bcrypt = require("bcryptjs");
const {
  valdiateRegister,
  valdiateLogin,
} = require("../utils/validations/users.schema");

/**
 * @desc create new account (sing up)
 * @params POST /api/v1/auth/register
 * @access PUBLIC
 **/

exports.register = async (req, res) => {
  try {
    // destructuring req.body
    const {
      username,
      email,
      password,
      role,
      workplace,
      profile,
      password_confirmation,
    } = req.body;
    // Validating input data from client
    const { error } = valdiateRegister(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message, status: "fail" });
    // check if email exists or not
    const existsEmail = await db.User.count({ where: { email } });
    if (existsEmail)
      return res
        .status(409)
        .json({ message: "this email already exists", status: "fail" });
    // generate a salt and hash password
    const slat = bcrypt.genSaltSync(10);
    const hachPassword = bcrypt.hashSync(password, slat);

    // create a new user (save on database )
    const newUser = await db.User.create({
      email,
      username,
      password: hachPassword,
      workplace,
      profile,
      role,
    });

    return res.status(201).json({
      message: "your account has been credited successfully",
      status: "success",
      data: { token: generateToken(newUser.id, role) },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`error register new user is ${error}`);
  }
};

/**
 * @desc login user (sign in)
 * @params POST /api/v1/auth/login
 * @access PUBLIC
 **/

exports.login = async (req, res) => {
  try {
    // destructuring req.body
    const { email, password } = req.body;
    // Validating input data from client
    const { error } = valdiateLogin(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const existsUser = await db.User.findOne({ where: { email } });
    if (!existsUser)
      return res
        .status(400)
        .json({ message: "invalid email and password", status: "fail" });
    // check password
    const checkpassword = bcrypt.compareSync(password, existsUser.password);
    if (!checkpassword)
      return res
        .status(400)
        .json({ message: "invaild email and password", status: "fail" });

    // send a message and token to the client
    return res.status(200).json({
      message: "You have logged in successfully",
      status: "sucess",
      data: { token: generateToken(existsUser.id, existsUser.role) },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`error login user ${error}`);
  }
};
