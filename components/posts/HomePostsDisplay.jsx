"use client";
import PostPeek from "./PostPeek";
import style from "../../styles/posts/HomePostsDisplay.module.css";
import HomeMainPost from "./HomeMainPost/HomeMainPost";
import HomeSecondPost from "./HomeSecondPost/HomeSecondPost";
import { useContext, useEffect, useState } from "react";
import appCurrentLangContext from "../../contexts/appCurrentLang";
import { getAllPosts } from "../../services/api/post";

// Display custom pour la homepage
const HomePostsDisplay = ({ posts }) => {
  const { appCurrentLang } = useContext(appCurrentLangContext);
  const [postsDisplayed, setPostsDisplayed] = useState(posts);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect, recharger les posts dans la bonne langue si le contexte de langue a changé
  useEffect(() => {
    const currentLangPosts = postsDisplayed?.[0]?.language;
    if (currentLangPosts && currentLangPosts !== appCurrentLang.locale) {
      setIsLoading(true);

      getAllPosts(appCurrentLang.locale).then((posts) => {
        setPostsDisplayed(posts);
        setIsLoading(false);
      });
    }
  }, [appCurrentLang.locale]);

  return (
    <>
      <div className={style.firstLine}>
        <div className={style.firstPart}>
          <HomeMainPost post={postsDisplayed[0]} />
        </div>
        <div className={style.secondPart}>
          <div>
            <HomeSecondPost post={postsDisplayed[1]} />
          </div>
          <div>
            <HomeSecondPost post={postsDisplayed[2]} />
          </div>
        </div>
      </div>
      <div className={style.secondLine}>
        {postsDisplayed.map((post, index) => {
          if (index > 2) {
            return <PostPeek post={post} key={index} />;
          }
        })}
      </div>
    </>
  );
};

export default HomePostsDisplay;
