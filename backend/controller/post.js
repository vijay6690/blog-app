import { db } from "../db.js";
import Jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  // console.log("response........",res);
  // console.log("cat.....", res.query.cat);
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  console.log(q);
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPostById = (req, res) => {
  // const q = "SELECT `username`,`title`,`desc`, p.img, u.img AS userImage`,`cat`,`date` FROM user u JOIN posts p ON u.id = p.uid WHERE p.id = ?"
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImage, `cat`,`date` FROM user u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");
  Jwt.verify(token, "jwtkey", (err, userInfo) => {
    // here userInfo is the ID whilch we have passed while storing the jwt token at the time of authentication
    console.log(userInfo.id);
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id`=? AND `uid`=?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post");
      return res.status(200).json("Your post has been deleted");
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");
  Jwt.verify(token, "jwtkey", (err, userInfo) => {
    // here userInfo is the ID whilch we have passed while storing the jwt token at the time of authentication
    console.log(userInfo.id);
    if (err) return res.status(403).json("Token is not valid");
  });

  const q =
    "INSERT INTO posts (`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    userInfo.id
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json("Failed to add the data");
    return res.status(200).json("post added successfully");
  });
};


export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  Jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};