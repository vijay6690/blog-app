import React from "react";
import "../style.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import {  useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export default function Write() {
  const state = useLocation().state
  console.log(state);

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title|| "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat ||"");
  const navigate = useNavigate()
  
  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append("file",file)  // here name "file" will be the same as we have defined in our server.js 
      const res = await axios.post("/upload",formData)
      console.log("inside write...", res.data);
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit =async (e) =>{
    e.preventDefault();
    // console.log(state);
    const imgUrl = await upload()
   try {
    state ?
    await axios.put(`/posts/${state.id}`,{
      title,
      desc:value,
      cat,
      img : file ? imgUrl : ""   /// it will check if there is file inserted then it will take that url otherwise it will send it empty
     })
    :
    await axios.post(`/posts/`,{
      title,
      desc:value,
      cat,
      img : file ? imgUrl : "" ,
      date : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    })
    navigate("/")
   } catch (error) {
    console.log(error);
   }
  }

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className="editor" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={e =>setCat(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "science"} name="cat" value="science" id="science" onChange={e =>setCat(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={e =>setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="cinema" onChange={e =>setCat(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={e =>setCat(e.target.value)} />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e =>setCat(e.target.value)} />
            <label htmlFor="art">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
}
