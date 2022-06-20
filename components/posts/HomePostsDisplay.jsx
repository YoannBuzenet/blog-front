import PostPeek from "./PostPeek";
import style from "../../styles/posts/HomePostsDisplay.module.css";

// Display custom pour la homepage
const HomePostsDisplay = ({ posts }) => {
  return (
    <>
      <div className={style.firstLine}>
        {posts.map((post, index) => {
          if (index === 0) {
            return <p>Post 1</p>;
          } else if (index === 1 || index === 2) {
            return <p>Post n°{index}</p>;
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
