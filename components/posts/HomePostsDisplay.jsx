import PostPeek from "./PostPeek";
import style from "../../styles/posts/HomePostsDisplay.module.css";
import HomeMainPost from "./HomeMainPost";
import HomeSecondPost from "./HomeSecondPost";

// Display custom pour la homepage
const HomePostsDisplay = ({ posts }) => {
  return (
    <>
      <div className={style.firstLine}>
        {posts.map((post, index) => {
          if (index === 0) {
            return <HomeMainPost post={post} />;
          } else if (index === 1 || index === 2) {
            return <HomeSecondPost index={index} post={post} />;
          }
        })}
      </div>
      <div className={style.secondLine}>
        {posts.map((post, index) => {
          if (index > 2) {
            return <PostPeek post={post} key={index} />;
          }
        })}
      </div>
    </>
  );
};

export default HomePostsDisplay;
