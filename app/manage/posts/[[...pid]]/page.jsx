import { JSONParseAllProps } from "../../../../services/utils";
import { createBlankPage } from "../../../../components/generic/wysiwyg/utils";
import { getOnePost } from "../../../../services/api/post";
import BackOfficeLayout from "../../../../components/back_office/layouts/BackOfficeLayout";
import ManageStateContainer from "../../../../components/back_office/ManageStateContainer/ManageStateContainer";

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

  // Choper les langues ici

  // TODO avoir le vrai user ID quand on aura des users !
  page.UserId = 1;

  return (
    <BackOfficeLayout>
      <ManageStateContainer
        pid={pid}
        isCreationInit={isCreationInit}
        page={page}
      />
    </BackOfficeLayout>
  );
}
