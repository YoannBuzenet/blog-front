"use client";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { Tag } from "../../../domain/tag/Tag";
import SubLayoutRight from "../layouts/SubLayoutRight";
import TagEditor from "./TagEditor";
import TagSaver from "./TagSaver";
import style from "./TagStateContainer.module.scss";

const TagStateContainer = ({ tags }) => {
  const [hasStateChanged, setHasStateChanged] = useState<boolean>(false);
  const [tagsState, setTagState] = useState(tags);

  const handleSetTagStateName = (e, idTag) => {
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

  const handleSetTagStateColor = (color, idTag) => {
    const stateCopy = cloneDeep(tagsState);

    for (const tag of stateCopy) {
      if (tag.id === idTag) {
        tag.color_hexcode = color;
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
      <SubLayoutRight CompoToRender={TagSaver}>
        <p className={style.title}>LES TAAAAGS</p>
        <div className={style.tagsContainer}>
          {tagsState.map((tag) => (
            <TagEditor
              tag={tag}
              setTagStateName={handleSetTagStateName}
              setTagColor={handleSetTagStateColor}
            />
          ))}
        </div>
      </SubLayoutRight>
    </>
  );
};

export default TagStateContainer;
