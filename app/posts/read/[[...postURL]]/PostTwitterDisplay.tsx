"use client";
import { useEffect } from "react";

const PostTwitterDisplay = () => {
  // Without this, the tweet can't load if using next client-side router
  useEffect(() => {
    window.twttr.widgets.load();
  }, []);
  return <></>;
};

export default PostTwitterDisplay;
