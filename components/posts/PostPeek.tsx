import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import { format } from "date-fns";
import style from "../../styles/posts/PostPeek.module.scss";
import Link from "next/link";

import { previewImageUrl } from "../../services/imageUtils";
import { Post } from "../../domain/post/Post";
import { parseSlateFormatSimple } from "../../services/react-slate";

const PostPeek = ({ post }) => {
  const postDomain = Post.builder()
    .id(post.id)
    .url(post.url)
    .mainImageUrl(post.mainImageUrl)
    .title(post.title)
    .createdAt(post.createdAt)
    .shortDescription(post.shortDescription)
    .build();

  return (
    <Link
      href={`/posts/${postDomain.url}`}
      passHref
      className={style.postContainer}
    >
      <div className={style.post}>
        <div>
          <div className={style.imageContainer}>
            <img src={previewImageUrl(postDomain.mainImageUrl)} />
          </div>
        </div>
        <DisplayHTML slateText={postDomain.title} />
        <div>
          <DisplayHTML slateText={postDomain.shortDescription} />
        </div>
        <p className={style.articleDate}>
          {format(new Date(post.createdAt), "dd/MM/yyyy")}{" "}
        </p>
      </div>
    </Link>
  );
};

export default PostPeek;
