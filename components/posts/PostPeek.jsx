import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import { format } from "date-fns";

const PostPeek = ({ post }) => {
  console.log("mon post", post);

  // title
  // shortDescription
  // content
  // createdAt
  // image ?

  // Deserialiser ce dont on a besoin en HTML

  // Le présenter dans les bons éléments pour un beau rendu

  return (
    <>
      <p>Je suis un post</p>
      <p>Title</p>
      <DisplayHTML slateText={post.title} />
      <p>Short description</p>
      <DisplayHTML slateText={post.shortDescription} />
      <p>Content</p>
      <DisplayHTML slateText={post.content} />
      <p>CreatedAt</p>
      <p>{format(new Date(post.createdAt), "dd/MM/yyyy")} </p>
    </>
  );
};

export default PostPeek;
