"use client";

import { useState } from "react";
import SubLayoutRight from "../../layouts/SubLayoutRight";
import SubLayoutContentPage from "../../pages/contentPage/SubLayoutContentPage";
import PostWysiwyg from "../PostWysiwyg/PostWysiwyg";
import { usePageState } from "./PostManageStateContainer.reducer";

// Ce composant sert à dispatch le state de gestion de la page entre le menu de droite et la page principale
const ManageStateContainer = ({ pid, isCreationInit, page }) => {
  const [hasStateChanged, setHasStateChanged] = useState<boolean>(false);
  const [isCreation, setIsCreation] = useState<boolean>(isCreationInit);

  const [pageState, dispatch] = usePageState(page);

  return (
    <>
      <SubLayoutRight
        CompoToRender={SubLayoutContentPage}
        pageState={pageState}
        dispatch={dispatch}
        hasStateChanged={hasStateChanged}
        setHasStateChanged={setHasStateChanged}
        isCreation={isCreation}
        setIsCreation={setIsCreation}
      >
        <div className="manageContentPageContainer">
          <PostWysiwyg
            page={page}
            isCreation={isCreation}
            pid={pid}
            pageState={pageState}
            hasStateChanged={hasStateChanged}
            setHasStateChanged={setHasStateChanged}
            dispatch={dispatch}
          />
        </div>
      </SubLayoutRight>
    </>
  );
};

export default ManageStateContainer;
