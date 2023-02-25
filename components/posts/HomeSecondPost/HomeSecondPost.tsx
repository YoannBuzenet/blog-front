"use client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { previewImageUrl } from "../../../services/imageUtils";
import style from "./HomeSecondPost.module.scss";
import DisplayHTML from "../../generic/wysiwyg/DisplayHTML";
import { Post } from "../../../domain/post/Post";
import TagHomePage from "../Tag/TagHomePage/TagHomePage";

type HomeSecondPostProps = {
  post: any;
  index?: number;
};

const HomeSecondPost = ({ post, index }: HomeSecondPostProps) => {
  console.log("post reçu", post);

  return (
    <div className={style.container}>
      <Link href={`/posts/${post.url}`} passHref>
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
        <div className={style.tagContainer}>
          {Array.isArray(post.Tags) &&
            post.Tags.map((rawTag) => <TagHomePage tagRaw={rawTag} />)}
        </div>
      </Link>
    </div>
  );
};

export default HomeSecondPost;
