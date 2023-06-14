import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import "../style.css";
import moment from "moment"
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export default function Single() {
  const [post,setPost] = useState({})
  const location = useLocation()
  const postId = location.pathname.split("/")[2]
  // console.log(postId);
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
      const getPost =async () => {
        try {
          const res = await axios.get(`/posts/${postId}`)
          console.log("useeffect single res.data...", res.data);
          setPost(res.data)
        } catch (error) {
          console.log(error);
        }
      }
      getPost()
      console.log(post);
      console.log(currentUser);

  },[postId])

  const handleDelete =async () => {
    try {
       await axios.delete( `/posts/${postId}`)
       navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="single">
      <div className="s-content">
        <img
          src={`../upload/${post?.img}`}
          alt=""
          className="s-image"
        />
        <div className="user">
          {post.userImage && <img src={post.userImage} alt="alt" className="user_img" />}
          <div className="info">
            <span>{post.username}</span>
            <p>posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username &&
           <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <button className="mx-1 pc-btn">Edit</button>
            </Link>
            <button className=" pc-btn" onClick={handleDelete}>Delete</button>
          </div>
          } 
        </div>
        <h1>{post.title}</h1>
        {post.desc}
      </div>
        <Menu cat={post.cat} />
    </div>
  );
}
