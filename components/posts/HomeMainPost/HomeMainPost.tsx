"use client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { previewImageUrl } from "../../../services/imageUtils";
import style from "./HomeMainPost.module.scss";
import DisplayHTML from "../../generic/wysiwyg/DisplayHTML";
import TagHomePage from "../Tag/TagHomePage/TagHomePage";

const HomeMainPost = ({ post }) => {
  return (
    <div className={style.container}>
      <Link href={`/posts/${post.url}`} passHref>
        <div>
          <div className={style.imageContainer}>
            <img src={previewImageUrl(post.mainImageUrl)} />
          </div>
          <p className={style.articleDate}>
            {format(new Date(post.createdAt), "dd/MM/yyyy")}{" "}
          </p>
        </div>
        <div className={style.tagContainer}>
          {Array.isArray(post.Tags) &&
            post.Tags.map((rawTag) => <TagHomePage tagRaw={rawTag} />)}
        </div>
        <div className={style.articleTitle}>
          <DisplayHTML slateText={post?.title} />
        </div>
      </Link>
    </div>
  );
};

export default HomeMainPost;
