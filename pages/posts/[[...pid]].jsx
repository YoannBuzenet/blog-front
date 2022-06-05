import { getOnePost } from "../../services/api/Post";
import { JSONParseAllProps } from "../../services/utils";

export async function getServerSideProps({ req, query, params }) {
  const { pid } = params;

  // TODO : gérer si 0 article correspond
  // Demander le post par le nom pour SEO purpose ?
  const jsonPage = await getOnePost(pid);
  const page = JSONParseAllProps(jsonPage);

  return { props: { page } };
}

const Post = ({ page }) => {
  console.log("page reçue", page);
  return <div className="container">Post</div>;
};

export default Post;
