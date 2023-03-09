import { create_user, find_user_by_username, find_user_by_id, Account } from "./model.js";
import jwt from "jsonwebtoken";
import { secret } from "./config/auth.config.js";
import { constants, responseUtils } from "./resources.js";
import pkg from 'bcryptjs';
const bcrypt = pkg;


const verifyToken = async (req, res) => {
  //todo: this is some diabolical shit.
  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send({
      message: constants.not_signed_in,
    });
  }
  let user;
  const decoded = jwt.verify(token, secret);
  user = await find_user_by_id(decoded.id);
  return user;
};
const isOstadOrAdmin = async (req, res, next) => {
  try {
    const user = await Account.findByPk(req.userId);
    const role = await user.role;
    if (role in [2, 3]) {
      return next();
    }
    return responseUtils.forbidden(res);
  } catch (error) {
    return responseUtils.server_error(error, res);
  }
};


export const sign_up = async function (req, res) {
  try {
    const {username, password, email, name} = req.body;
    const existingUser = await find_user_by_username(username);
    if (existingUser){
      return res.status(409).send(constants.user_already_exists);
    }
    const user = await create_user(
      username,
      bcrypt.hashSync(password, 8),
      email,
      name,
      1,
    );
    res.send({
      'username': user.username,
      'name': user.name,
    });
  } catch (error) {
    responseUtils.server_error(error, res);
  }
};

export const sign_in = async function (req, res) {
  const {username, password} = req.body;
  try {
    const user = await find_user_by_username(username);

    if (!user) {
      return res.status(401).send(
        constants.wrong_user_password
      );
    }

    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send(
        constants.wrong_user_password
      );
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400, // 24 hours
    });

    // todo: is sending token here valid?
    req.headers.authorization = 'Bearer ' + token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.role,
      name: user.name,
      token: token
    });
  } catch (error) {
    return responseUtils.server_error(error, res);
  }
};

export const logout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};


export const authJwt = {
  verifyToken,
  isOstadOrAdmin,
};