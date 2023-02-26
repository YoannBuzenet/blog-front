"use client";
import { useState } from "react";
import SubLayoutRight from "../layouts/SubLayoutRight";
import TagEditor from "./TagEditor";
import style from "./TagStateContainer.module.scss";

const TagStateContainer = ({ tags }) => {
  const [hasStateChanged, setHasStateChanged] = useState<boolean>(false);

  return (
    <>
      <SubLayoutRight CompoToRender={() => <p>Ok</p>}>
        <p className={style.title}>LES TAAAAGS</p>
        <div className={style.tagsContainer}>
          {tags.map((tag) => (
            <TagEditor tag={tag} />
          ))}
        </div>
      </SubLayoutRight>
    </>
  );
};

export default TagStateContainer;
