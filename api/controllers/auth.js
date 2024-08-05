import { authModel } from "../model/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await authModel.findOne({ email, name });
    if (user) {
      return res.status(409).json("User already exist!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await authModel.create({ email, name, password: hash });

    return res.status(200).json("user has been created");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const result = await authModel.find({ name: name });

    if (result.length === 0) {
      return res.status(404).json("User not found!");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, result[0].password);

    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username or password");
    }

    const token = jwt.sign({ id: result[0].id, role: "captain" }, "jwtKey");
    res

      .status(200)
      .cookie("access_token", token, {
        secure: process.env.NODE_ENV === "production",
      })
      .json(result[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
