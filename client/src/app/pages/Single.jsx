import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
const Single = () => {
  const [post, setPost] = useState([]);
  const api = "http://localhost:8800/api";

  const location = useLocation();

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(`${api}/posts/${postId}`);
        setPost(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${api}/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          <img
            src="https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt=""
          />
          <div className="info">
            <span>{currentUser.name}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && (
            <div className="edit">
              <Link to={`/write?edit=${post._id}`} state={post}>
                <img src="/edit.png" alt="edit" />
              </Link>
              <img onClick={handleDelete} src="/delete.png" alt="delete" />
            </div>
          )}
        </div>
        <h1>{post?.title}</h1>
        <p>{getText(post?.desc)}</p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
