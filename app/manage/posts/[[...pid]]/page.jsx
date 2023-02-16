import { JSONParseAllProps } from "../../../../services/utils";
import { createBlankPage } from "../../../../components/generic/wysiwyg/utils";
import { getOnePostById } from "../../../../services/api/post";
import BackOfficeLayout from "../../../../components/back_office/layouts/BackOfficeLayout";
import ManageStateContainer from "../../../../components/back_office/ManageStateContainer/ManageStateContainer";

export default async function PostPage({ params }) {
  const { pid } = params;

  let isCreationInit = pid === undefined;

  let page = {};

  if (isCreationInit) {
    page = createBlankPage();
  } else {
    try {
      const jsonPage = await getOnePostById(pid);
      page = JSONParseAllProps(jsonPage);
    } catch (e) {
      console.log("Error while loading the post :" + e);
      page = createBlankPage();
      isCreationInit = true;
    }
  }

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
