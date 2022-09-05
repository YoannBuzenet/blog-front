import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { previewImageUrl } from "../../services/imageUtils";
import style from "../../styles/posts/HomeSecondPost.module.css";
import DisplayHTML from "../generic/wysiwyg/DisplayHTML";

const HomeSecondPost = ({ post, index }) => {
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
          <p className={style.articleDate}>
            {format(new Date(post.createdAt), "dd/MM/yyyy")}{" "}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default HomeSecondPost;
