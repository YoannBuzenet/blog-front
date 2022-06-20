import DisplayHTML from "../../components/generic/wysiwyg/DisplayHTML";
import { getOnePost } from "../../services/api/Post";
import { JSONParseAllProps } from "../../services/utils";
import genericTextStyle from "../../styles/generic/genericTextStyle.module.css";
import { Post } from "../../domain/post/Post";
import NavBar from "../../components/Navbar/NavBar";

export async function getServerSideProps({ req, query, params }) {
  const { pid } = params;

  // TODO : gérer si 0 article correspond
  // Demander le post par le nom pour SEO purpose ?
  const jsonPost = await getOnePost(pid);
  const postParsed = JSONParseAllProps(jsonPost);

  return { props: { postParsed } };
}

const onePost = ({ postParsed }) => {
  const post = Post.builder()
    .id(postParsed.id)
    .title(postParsed.title)
    .metaDescription(postParsed.metaDescription)
    .shortDescription(postParsed.shortDescription)
    .content(postParsed.content)
    .userId(postParsed.UserId)
    .createdAt(postParsed.createdAt)
    .updatedAt(postParsed.updatedAt)
    .build();

  return (
    <>
      <NavBar />
      <div className="container belowNavbar">
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
    </>
  );
};

export default onePost;
