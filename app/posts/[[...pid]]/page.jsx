import DisplayHTML from "../../../components/generic/wysiwyg/DisplayHTML";
import { getOnePost } from "../../../services/api/post";
import { JSONParseAllProps } from "../../../services/utils";
import genericTextStyle from "../../../styles/generic/genericTextStyle.module.css";
import { Post } from "../../../domain/post/Post";
import NavBar from "../../../components/Navbar/NavBar";
import style from "../../../styles/posts/PostPage.module.css";
import Footer from "../../../components/Footer/Footer";
import { previewImageUrl } from "../../../services/imageUtils";
import { format } from "date-fns";
import { getAllAnswersForPost } from "../../../services/api/answer";
import AnswerPost from "../../../components/posts/AnswerPost";
import { AnswerManager } from "../../../domain/answer/AnswerManager";
import PostLangRefresh from "./PostLangRefresh";


export default async function OnePost({params}) {

    const {pid} = params;
    const idPost = pid[0];


  const jsonPost = await getOnePost(idPost);
  const postParsed = JSONParseAllProps(jsonPost);

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

    const answers = await getAllAnswersForPost(post.id)
  const answerDomain = answers.map((answer) =>
        AnswerManager.fromJSONToDomain(answer)
      );
  const sortedAnswers = AnswerManager.sortAnswers(answerDomain);

  // TODO SI post.createdAt !== post.updatedAt : afficher "Mis à jour le X"

  return (
    <>
    {/* <PostLangRefresh post={post}/> */}
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
            {/* {sortedAnswers.map((answer, index) => (
              <AnswerPost
                answer={answer}
                key={index}
                level={0}
                idPost={post.id}
              />
            ))} */}
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

