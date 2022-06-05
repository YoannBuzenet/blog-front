import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import { format } from "date-fns";
import style from "../../styles/posts/PostPeek.module.css";

const PostPeek = ({ post }) => {
  console.log("mon post", post);
  // image ?

  // Le présenter dans les bons éléments pour un beau rendu

  return (
    <div className={style.post}>
      <DisplayHTML slateText={post.title} />
      <p>Short description</p>
      <DisplayHTML slateText={post.shortDescription} />
      <p>Content</p>
      <DisplayHTML slateText={post.content} />
      <p>Publié le</p>
      <p>{format(new Date(post.createdAt), "dd/MM/yyyy")} </p>
    </div>
  );
};

export default PostPeek;
