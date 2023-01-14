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
import { useState } from "react";
import { getAllAnswersForPost } from "../../services/api/answer";
import AnswerPost from "../../components/posts/AnswerPost";
import { AnswerManager } from "../../domain/answer/AnswerManager";
import PostLangRefresh from "./PostLangRefresh";


export default async function OnePost({params,searchParams}) {


  const jsonPost = await getOnePost(pid);
  const postParsed = JSONParseAllProps(jsonPost);

  const answers = await getAllAnswersForPost(post.id)
  const answerDomain = answers.map((answer) =>
        AnswerManager.fromJSONToDomain(answer)
      );
  const sortedAnswers = AnswerManager.sortAnswers(answerDomain);


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

  // TODO SI post.createdAt !== post.updatedAt : afficher "Mis à jour le X"

  const { appCurrentLang } = useContext(AppCurrentLangContext);


  const router = useRouter();

  useEffect(() => {
    console.log("appCurrentLang", appCurrentLang);
    if (!appCurrentLang.isDefault && appCurrentLang.locale !== post.language) {
      console.log("post", post);
      if (Array.isArray(post.sibling && post.sibling.length > 1)) {
        const postToDisplay = post.sibling.filter(
          (post) => post.language === appCurrentLang.locale
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
          toast.info("Le post n'existe pas dans cette langue, redirection vers la home.", {
            toastId: "change",
          });
        }
      } else {

        console.log('LAAA')
        // Post has no sibling. Redirection to home.

        // router.push("/");

        //TODO translate
        toast.info("Le post n'existe pas, redirection vers la home.", {
          toastId: "change",
        });
      }
    }
  }, [appCurrentLang.locale]);



  return (
    <>
    <PostLangRefresh post={post}/>
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
        
          <div className={style.answerPostContainer}>
            <h2 className="h2">Answers</h2>
            {sortedAnswers.map((answer, index) => (
              <AnswerPost
                answer={answer}
                key={index}
                level={0}
                idPost={post.id}
                loadAnswers={loadAnswers}
              />
            ))}
          </div>
        
        {sortedAnswers.length === 0 && (
          <div className={style.answerPostContainer}>
            <p>No answers for now.</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

