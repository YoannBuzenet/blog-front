import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import { format } from "date-fns";
import style from "../../styles/posts/PostPeek.module.css";
import Link from "next/link";
import Image from "next/image";

const PostPeek = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`} passHref>
      <div className={style.post}>
        <div>
          <Image
            src="https://via.placeholder.com/350.png"
            alt="Landscape picture"
            width={"350px"}
            height={"250px"}
          />
        </div>
        <DisplayHTML slateText={post.title} />
        {/* <p>Publié le</p>
        <p>{format(new Date(post.createdAt), "dd/MM/yyyy")} </p> */}
      </div>
    </Link>
  );
};

export default PostPeek;
