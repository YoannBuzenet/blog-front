import Image from "next/image";
import Link from "next/link";
import style from "../../styles/posts/HomeSecondPost.module.css";
import DisplayHTML from "../generic/wysiwyg/DisplayHTML";

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
          <div className={style.articleDescription}>
            <DisplayHTML slateText={post?.shortDescription} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeSecondPost;
