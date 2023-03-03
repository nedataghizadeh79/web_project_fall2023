import { validationResult } from "express-validator";
import {create_user, find_user_by_username, Account} from "./model.js";
import jwt from "jsonwebtoken";
import {secret} from "./config/auth.config.js";
import {constants, messages, responseUtils} from "./resources.js";
import pkg from 'bcryptjs';
const bcrypt = pkg;


const verifyToken = (req, res, next) => {
  let token = req.session.token;
  if (!token) {
    return res.status(403).send({
      message: constants.not_signed_in,
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: constants.token_expired,
      });
    }
    req.userId = decoded.id;
    next();
  });
};
const isOstadOrAdmin = async (req, res, next) => {
  try {
    const user = await Account.findByPk(req.userId);
    const role = await user.role;
    if (role in [2, 3]){
      return next();
    }
    return responseUtils.forbidden(res);
  } catch (error) {
    return responseUtils.server_error(error, res);
  }
};


export const sign_up = async function (req, res) {
  console.log("nigga");
  try {
    const user = await create_user(
      req.body.username,
      bcrypt.hashSync(req.body.password, 8),
      req.body.email,
      req.body.name,
      1,
    );
    res.send(constants.account_created);
  } catch (error) {
    responseUtils.server_error(error, res);
  }
};

export const sign_in = async function (req, res) {
  try {
    const user = await find_user_by_username(req.body.username);

    if (!user) {
      return responseUtils.not_found(res);
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    // todo: is sending token here valid?
    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.role,
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

export const user = async function (token) {
  try {
    let req = {
      // probably needs change
      url: "token",
      token: token,
    };
    let user_result = await proxy(req);
    return user_result.body.user_id;
  } catch (error) {
    return -1;
  }
};

export const authJwt = {
  verifyToken,
  isOstadOrAdmin,
};