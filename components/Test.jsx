import { useEffect } from "react";
import { getAllPosts } from "../services/api/post";

const Test = () => {
  useEffect(() => {
    getAllPosts().then((resp) => console.log(resp));
  }, []);

  return <>Test</>;
};

export default Test;
