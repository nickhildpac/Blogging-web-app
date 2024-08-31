import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
      headers: {
        Authorization: localStorage.getItem("token")
      }
    } )
    .then(res => {
        setBlogs(res.data.blogs);
        setLoading(false);
      });
  },[]);

  return {
    loading,
    blogs
  }
}
export interface Blog {
    "content": string;
    "title": string;
    "id": number;
    "author": {
      "name": string;
    }
}

export const useBlog = ({id} : {id : number}) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
      headers: {
        Authorization: localStorage.getItem("token")
      }
    } )
    .then(res => {
        setBlog(res.data.blog);
        setLoading(false);
      });
  },[id]);
  console.log(blog);
  return {
    loading,
    blog
  }
}
