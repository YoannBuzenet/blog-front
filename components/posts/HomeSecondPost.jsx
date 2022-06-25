import Image from "next/image";
import Link from "next/link";
import style from "../../styles/posts/HomeSecondPost.module.css";

const HomeSecondPost = ({ post, index }) => {
  return (
    <div className={style.container}>
      <Link href={`/posts/${post.id}`} passHref>
        <div>
          <div>
            <Image
              src="https://via.placeholder.com/350.png"
              alt="Landscape picture"
              width={"200px"}
              height={"150px"}
            />
          </div>
          <p>Post {index + 1}</p>
        </div>
      </Link>
    </div>
  );
};

export default HomeSecondPost;
