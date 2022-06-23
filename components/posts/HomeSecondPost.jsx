import Image from "next/image";
import style from "../../styles/posts/HomeSecondPost.module.css";

const HomeSecondPost = ({ post, index }) => {
  return (
    <div className={style.container}>
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <Image
          src="https://via.placeholder.com/350.png"
          alt="Landscape picture"
          layout="fill"
        />
      </div>
      <p>Post {index + 1}</p>
    </div>
  );
};

export default HomeSecondPost;
