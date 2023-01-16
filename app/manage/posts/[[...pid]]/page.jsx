import SubLayoutRight from "../../../../components/back_office/layouts/SubLayoutRight";
import { JSONParseAllProps } from "../../../../services/utils";
import { createBlankPage } from "../../../../components/generic/wysiwyg/utils";
import { getOnePost } from "../../../../services/api/post";
import PostWysiwyg from "../../../../components/back_office/PostWysiwyg/PostWysiwyg";
import BackOfficeLayout from "../../../../components/back_office/layouts/BackOfficeLayout";
import SubLayoutContentPage from "../../../../components/back_office/pages/contentPage/SubLayoutContentPage";

//TODO : ce compo fait trop de trucs, il faudrait le refacto/décomposer un petit peu
// Il gère un post en state mais ce n'est jamais défini nulle part. Il faudrait tout typer sur le post, instancier un post
// Pareil pour la fonction sauvegarde dans SubLayoutContentPage. Il faudrait faire une factory autour pour qu'elle puisse tout sauvegarder, y compris un Post

export default async function PostPage({ params }) {
  // is creation ?
  const { pid } = params;

  let isCreationInit = pid === undefined;

  let page = {};

  if (isCreationInit) {
    page = createBlankPage();
  } else {
    try {
      const jsonPage = await getOnePost(pid);
      page = JSONParseAllProps(jsonPage);
    } catch (e) {
      console.log("Error while loading the post :" + e);
      page = createBlankPage();
      isCreationInit = true;
    }
  }

  // TODO avoir le vrai user ID quand on aura des users !
  page.UserId = 1;

  // checked

  // si pid est défini, il est une array

  // console.log("page sate stringifié", JSON.stringify(pageState.content));
  // console.log(
  //   "pageState.metaDescription stringifié",
  //   JSON.stringify(pageState.metaDescription)
  // );
  // console.log("pageState.title stringifié", JSON.stringify(pageState.title));
  // console.log(
  //   "shortDescription stringifié",
  //   JSON.stringify(pageState.shortDescription)
  // );
  // console.log("is creation ?", isCreation);

  return (
    <BackOfficeLayout>
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
          <PostWysiwyg page={page} isCreationInit={isCreationInit} pid={pid} />
        </div>
      </SubLayoutRight>
    </BackOfficeLayout>
  );
}
