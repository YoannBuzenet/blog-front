import DisplayHTML from "../../../../components/generic/wysiwyg/DisplayHTML";
import {
  getOnePost,
  getOnePostbyTitle,
  getOnePostbyURL,
} from "../../../../services/api/post";
import { JSONParseAllProps } from "../../../../services/utils";
import genericTextStyle from "../../../../styles/generic/genericTextStyle.module.css";
import style from "../../../../styles/posts/PostPage.module.css";
import { previewImageUrl } from "../../../../services/imageUtils";
import { format } from "date-fns";
import { getAllAnswersForPost } from "../../../../services/api/answer";
import AnswerPost from "../../../../components/posts/AnswerPost/AnswerPost";
import { AnswerManager } from "../../../../domain/answer/AnswerManager";
import PostLangRefresh from "./PostLangRefresh";
import { PostManager } from "../../../../domain/post/PostManager";
import TagInPost from "../../../../components/posts/Tag/TagInPost/TagInPost";
import PostTwitterDisplay from "./PostTwitterDisplay";

export default async function OnePost({ params }) {
  const { postURL } = params;
  const postURLPost = postURL[0];

  const jsonPost = await getOnePostbyURL(postURLPost);
  const postParsed = JSONParseAllProps(jsonPost);

  console.log("postParsed", postParsed);

  const post = PostManager.fromJSONToDomain(postParsed);

  const answers = await getAllAnswersForPost(post.id);
  const sortedAnswers = AnswerManager.sortAnswers(answers);

  // TODO SI post.createdAt !== post.updatedAt : afficher "Mis à jour le X"

  // console.log("post", post);

  return (
    <>
      <PostLangRefresh postParsed={postParsed} />
      <PostTwitterDisplay />
      <div className="contentPageContainer belowNavbar">
        <h1 className={genericTextStyle.title}>
          <DisplayHTML slateText={post?.title} />
        </h1>
        <p>{format(new Date(post.createdAt), "dd/MM/yyyy")}</p>
        <div className={style.tagContainer}>
          {Array.isArray(postParsed.Tags) &&
            postParsed.Tags.map((rawTag) => <TagInPost tagRaw={rawTag} />)}
        </div>
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
              rawAnswer={answer}
              key={index}
              level={0}
              idPost={post.id}
            />
          ))}
        </div>

        {sortedAnswers.length === 0 && (
          <div className={style.answerPostContainer}>
            <p>No answers for now.</p>
          </div>
        )}
      </div>
    </>
  );
}
