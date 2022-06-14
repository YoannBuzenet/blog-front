import DisplayHTML from "../../components/generic/wysiwyg/DisplayHTML";
import { getOnePost } from "../../services/api/Post";
import { JSONParseAllProps } from "../../services/utils";
import genericTextStyle from "../../styles/generic/genericTextStyle.module.css";
import { Post } from "../../domain/post/Post";

export async function getServerSideProps({ req, query, params }) {
  const { pid } = params;

  // TODO : gérer si 0 article correspond
  // Demander le post par le nom pour SEO purpose ?
  const jsonPost = await getOnePost(pid);
  const post = JSONParseAllProps(jsonPost);

  return { props: { post } };
}

const onePost = ({ post }) => {
  //TODO -> passer l'objet en Post

  console.log("post reçu", post);
  return (
    <div className="container">
      <h1 className={genericTextStyle.title}>
        <DisplayHTML slateText={post?.title} />
      </h1>
      <div className={genericTextStyle.articleDescription}>
        <DisplayHTML slateText={post?.shortDescription} />
      </div>
      <div className={genericTextStyle.content}>
        <DisplayHTML slateText={post?.content} />
      </div>
    </div>
  );
};

export default onePost;
