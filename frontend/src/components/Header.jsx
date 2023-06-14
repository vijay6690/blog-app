import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import "../style.css";

export default function Header() {

  const {currentUser,logout} = useContext(AuthContext)
  
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <strong><Link to={"/"} className="link"> My Blog </Link></strong>
        </div>
        <div className="links">
          <Link to={"/?cat=art"} className="link">
            <h6>ART</h6>
          </Link>
          <Link to={"/?cat=science"} className="link">
            <h6>SCIENCE</h6>
          </Link>
          <Link to={"/?cat=technology"} className="link">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link to={"/?cat=cinema"} className="link">
            <h6>CINEMA</h6>
          </Link>
          <Link to={"/?cat=design"} className="link">
            <h6>DESIGN</h6>
          </Link>
          <Link to={"/?cat=food"} className="link">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? <span onClick={logout}>Logout</span> : <Link className="link mb-2" to={"/login"}>Login</Link>}
          <span className="write">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
