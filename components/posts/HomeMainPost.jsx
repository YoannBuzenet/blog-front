import Image from "next/image";
import Link from "next/link";
import style from "../../styles/posts/HomeMainPost.module.css";

const HomeMainPost = ({ post }) => {
  return (
    <div className={style.container}>
      <Link href={`/posts/${post.id}`} passHref>
        <div>
          <div>
            <Image
              src="https://via.placeholder.com/350.png"
              alt="Landscape picture"
              width={"400px"}
              height={"200px"}
            />
          </div>
          <p>Main Post</p>
        </div>
      </Link>
    </div>
  );
};

export default HomeMainPost;
