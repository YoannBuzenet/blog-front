import DisplayHTML from "../../components/generic/wysiwyg/DisplayHTML";
import { getOnePost } from "../../services/api/post";
import { JSONParseAllProps } from "../../services/utils";
import genericTextStyle from "../../styles/generic/genericTextStyle.module.css";
import { Post } from "../../domain/post/Post";
import NavBar from "../../components/Navbar/NavBar";
import style from "../../styles/posts/PostPage.module.css";
import Footer from "../../components/Footer/Footer";
import { previewImageUrl } from "../../services/imageUtils";
import { format } from "date-fns";
import AppCurrentLangContext from "../../contexts/appCurrentLang";
import { useContext, useEffect } from "react";
import { localeToLangDictionnary } from "../../i18n/allLang";
import { useRouter } from "next/router";
import { parseSlateFormatSimple } from "../../services/react-slate";
import { toast } from "react-toastify";

export async function getServerSideProps({ req, query, params }) {
  const { pid } = params;

  // TODO : gérer si 0 article correspond
  // Demander le post par le nom pour SEO purpose ?
  const jsonPost = await getOnePost(pid);
  const postParsed = JSONParseAllProps(jsonPost);

  return { props: { postParsed } };
}

const OnePost = ({ postParsed }) => {
  const post = Post.builder()
    .id(postParsed.id)
    .title(postParsed.title)
    .metaDescription(postParsed.metaDescription)
    .shortDescription(postParsed.shortDescription)
    .mainImageUrl(postParsed.mainImageUrl)
    .language(postParsed.language)
    .content(postParsed.content)
    .isScoop(postParsed.isScoop)
    .createdAt(postParsed.createdAt)
    .userId(postParsed.UserId)
    .sibling(postParsed.Sibling)
    .updatedAt(postParsed.updatedAt)
    .build();

  // SI post.createdAt !== post.updatedAt : afficher "Mis à jour le X"

  const { appCurrentLang } = useContext(AppCurrentLangContext);
  const router = useRouter();

  useEffect(() => {
    if (appCurrentLang.locale !== post.lang) {
      if (Array.isArray(post.sibling && post.sibling.length > 1)) {
        const postToDisplay = post.sibling.filter(
          (post) => post.lang === appCurrentLang.locale
        );
        if (postToDisplay) {
          // We found a sibling o the post. Redirecting to him
          const titleExtracted = parseSlateFormatSimple(postToDisplay.title);
          router.push(titleExtracted);
          //TODO translate
          toast.info("Redirection vers le post traduit.");
        } else {
          // Post has sibling but no one in the relevant language
          router.push("/");
          //TODO translate
          toast.info("Le post n'existe pas, redirection vers la home.", {
            toastId: "change",
          });
        }
      } else {
        // Post has no sibling. Redirection to home.
        router.push("/");
        //TODO translate
        toast.info("Le post n'existe pas, redirectino vers la home.", {
          toastId: "change",
        });
      }
    }
  }, [appCurrentLang.locale]);

  return (
    <>
      <NavBar />
      <div className="contentPageContainer belowNavbar">
        <h1 className={genericTextStyle.title}>
          <DisplayHTML slateText={post?.title} />
        </h1>
        <p>{format(new Date(post.createdAt), "dd/MM/yyyy")} </p>
        <div className={style.imageContainer}>
          <img src={previewImageUrl(post?.mainImageUrl)} />
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

export default OnePost;
