import { TagManager } from "../../domain/tag/TagManager";
import style from "./Tag.module.scss";

const Tag = ({ tagRaw }) => {
  const tag = TagManager.fromJSONToDomain(tagRaw);

  return <div className={style.container}>{tag.name}</div>;
};

export default Tag;
