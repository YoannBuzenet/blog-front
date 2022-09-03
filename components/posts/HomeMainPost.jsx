import Image from "next/image";
import Link from "next/link";
import { previewImageUrl } from "../../services/imageUtils";
import style from "../../styles/posts/HomeMainPost.module.css";
import DisplayHTML from "../generic/wysiwyg/DisplayHTML";

const HomeMainPost = ({ post }) => {
  return (
    <div className={style.container}>
      <Link href={`/posts/${post.id}`} passHref>
        <div>
          <div className={style.imageContainer}>
            <img src={previewImageUrl(post.mainImageUrl)} />
          </div>
          <div className={style.articleDescription}>
            <DisplayHTML slateText={post?.title} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeMainPost;
