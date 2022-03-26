import { useEffect } from "react";
import { getAllPosts } from "../services/api/Post";

const Test = () => {
  useEffect(() => {
    getAllPosts().then((resp) => console.log(resp));
  }, []);

  return <>Test</>;
};

export default Test;
