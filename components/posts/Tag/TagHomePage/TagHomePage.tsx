import { TagManager } from "../../../../domain/tag/TagManager";
import style from "./TagHomePage.module.scss";

const TagHomePage = ({ tagRaw }) => {
  const tag = TagManager.fromJSONToDomain(tagRaw);

  return (
    <>
      <style jsx>{`
        .tag${tag.id} {
          background-color: ${tag.color_hexcode}55;
        }
      `}</style>
      <div className={`${style.container} tag${tag.id}`}>
        <p className={`${style.textParagraph}`}>{tag.name}</p>
      </div>
    </>
  );
};

export default TagHomePage;
