import Image from "next/image";
import style from "../../styles/posts/HomeMainPost.module.css";

const HomeMainPost = ({ post }) => {
  return (
    <div className={style.container}>
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <Image
          src="https://via.placeholder.com/350.png"
          alt="Landscape picture"
          layout="fill"
        />
      </div>
      <p>Main Post</p>
    </div>
  );
};

export default HomeMainPost;
