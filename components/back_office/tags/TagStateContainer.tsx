"use client";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { Tag } from "../../../domain/tag/Tag";
import SubLayoutRight from "../layouts/SubLayoutRight";
import TagEditor from "./TagEditor";
import style from "./TagStateContainer.module.scss";

const TagStateContainer = ({ tags }) => {
  const [hasStateChanged, setHasStateChanged] = useState<boolean>(false);
  const [tagsState, setTagState] = useState<Tag[]>(tags);

  const handleSetTagState = (e, idTag) => {
    const stateCopy = cloneDeep(tagsState);

    for (const tag of stateCopy) {
      if (tag.id === idTag) {
        tag.name = e.target.value;
        tag.hasBeenModified = true;
      }
    }

    setHasStateChanged(true);
    setTagState(stateCopy);
  };

  // TODO -> sauvegarde des tags dans le menu de droite, reprendre le code des posts
  // voir si on peut fair ça avec des classes

  return (
    <>
      <SubLayoutRight CompoToRender={() => <p>Ok</p>}>
        <p className={style.title}>LES TAAAAGS</p>
        <div className={style.tagsContainer}>
          {tagsState.map((tag) => (
            <TagEditor tag={tag} setTagState={handleSetTagState} />
          ))}
        </div>
      </SubLayoutRight>
    </>
  );
};

export default TagStateContainer;
