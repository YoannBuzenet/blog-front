import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import { format } from "date-fns";
import style from "../../styles/posts/PostPeek.module.css";
import Link from "next/link";

import { previewImageUrl } from "../../services/imageUtils";

const PostPeek = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`} passHref>
      <div className={style.post}>
        <div>
          <div className={style.imageContainer}>
            <img src={previewImageUrl(post.mainImageUrl)} />
          </div>
        </div>
        <DisplayHTML slateText={post.title} />
        {/* <p>Publié le</p>
        <p>{format(new Date(post.createdAt), "dd/MM/yyyy")} </p> */}
      </div>
    </Link>
  );
};

export default PostPeek;
