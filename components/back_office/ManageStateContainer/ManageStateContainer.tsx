"use client";

import { useState } from "react";
import SubLayoutRight from "../layouts/SubLayoutRight";
import SubLayoutContentPage from "../pages/contentPage/SubLayoutContentPage";
import PostWysiwyg from "../PostWysiwyg/PostWysiwyg";

const ManageStateContainer = ({ pid, isCreationInit, page }) => {
  const [pageState, setPageState] = useState({ ...page });
  const [hasStateChanged, setHasStateChanged] = useState(false);
  const [isCreation, setIsCreation] = useState(isCreationInit);

  return (
    <>
      <SubLayoutRight
        CompoToRender={SubLayoutContentPage}
        pageState={pageState}
        setPageState={setPageState}
        hasStateChanged={hasStateChanged}
        setHasStateChanged={setHasStateChanged}
        isCreation={isCreation}
        setIsCreation={setIsCreation}
      >
        <div className="contentPageContainer">
          <PostWysiwyg
            page={page}
            isCreation={isCreation}
            pid={pid}
            pageState={pageState}
            setPageState={setPageState}
            hasStateChanged={hasStateChanged}
            setHasStateChanged={setHasStateChanged}
          />
        </div>
      </SubLayoutRight>
    </>
  );
};

export default ManageStateContainer;
