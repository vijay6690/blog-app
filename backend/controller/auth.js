import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // check existing user
  console.log("inside the register controller");
  const q = "SELECT * FROM user WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");
    if (req.body.username && req.body.email && req.body.password) {
      // to hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      // insert the user into db
      const q = "INSERT INTO user (`username`,`email`,`password`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash];

      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("User has been created");
      });
    } else {
      return res.status(409).json("Please fill the values");
    }
  });
};

export const login = (req, res) => {
  // check username exists or not
  console.log("inside login controller");
  const q = "SELECT * FROM user WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (data.length === 0) return res.status(404).json("User not found");

    // check the password
    const isPassCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPassCorrect)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User Logged out successfully");
};
