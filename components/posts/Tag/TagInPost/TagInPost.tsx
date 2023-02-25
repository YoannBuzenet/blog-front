import { TagManager } from "../../../../domain/tag/TagManager";
import style from "./TagInPost.module.scss";

const TagInPost = ({ tagRaw }) => {
  const tag = TagManager.fromJSONToDomain(tagRaw);

  return (
    <>
      <style jsx>{`
        .tag${tag.id} {
          background-color: ${tag.color_hexcode}55;
        }
      `}</style>
      <div className={`${style.container} tag${tag.id}`}>
        <p>{tag.name}</p>
      </div>
    </>
  );
};

export default TagInPost;
