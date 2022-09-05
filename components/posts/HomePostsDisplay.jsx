import PostPeek from "./PostPeek";
import style from "../../styles/posts/HomePostsDisplay.module.css";
import HomeMainPost from "./HomeMainPost";
import HomeSecondPost from "./HomeSecondPost";

// Display custom pour la homepage
const HomePostsDisplay = ({ posts }) => {
  return (
    <>
      <div className={style.firstLine}>
        <div className={style.firstPart}>
          <HomeMainPost post={posts[0]} />
        </div>
        <div className={style.secondPart}>
          <div>
            <HomeSecondPost post={posts[1]} />
          </div>
          <div>
            <HomeSecondPost post={posts[2]} />
          </div>
        </div>
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
