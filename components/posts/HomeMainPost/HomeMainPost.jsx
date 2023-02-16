"use client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { previewImageUrl } from "../../../services/imageUtils";
import style from "./HomeMainPost.module.scss";
import DisplayHTML from "../../generic/wysiwyg/DisplayHTML";
import { parseSlateFormatSimple } from "../../../services/react-slate";

const HomeMainPost = ({ post }) => {
  const postTitleParsed = parseSlateFormatSimple(post.title);
  const titleAsURI = encodeURI(postTitleParsed);

  return (
    <div className={style.container}>
      <Link href={`/posts/${titleAsURI}`} passHref>
        <div>
          <div className={style.imageContainer}>
            <img src={previewImageUrl(post.mainImageUrl)} />
          </div>
          <div className={style.articleTitle}>
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

export default HomeMainPost;
