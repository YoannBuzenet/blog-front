import DisplayHTML from "../../components/generic/wysiwyg/DisplayHTML";
import { getOnePost } from "../../services/api/post";
import { JSONParseAllProps } from "../../services/utils";
import genericTextStyle from "../../styles/generic/genericTextStyle.module.css";
import { Post } from "../../domain/post/Post";
import NavBar from "../../components/Navbar/NavBar";
import style from "../../styles/posts/PostPage.module.css";
import Image from "next/image";
import Footer from "../../components/Footer/Footer";

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
    .isScoop(postParsed.isScoop)
    .userId(postParsed.UserId)
    .createdAt(postParsed.createdAt)
    .updatedAt(postParsed.updatedAt)
    .build();

  return (
    <>
      <NavBar />
      <div className="contentPageContainer belowNavbar">
        <h1 className={genericTextStyle.title}>
          <DisplayHTML slateText={post?.title} />
        </h1>
        <div className={style.imageContainer}>
          <Image
            src="https://via.placeholder.com/350.png"
            alt="Landscape picture"
            width={"700px"}
            height={"350px"}
          />
        </div>
        <div
          className={`${genericTextStyle.articleDescription} articleDescription`}
        >
          <DisplayHTML slateText={post?.shortDescription} />
        </div>
        <div className={genericTextStyle.content}>
          <DisplayHTML slateText={post?.content} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default onePost;
