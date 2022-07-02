import BackOfficeLayout from "../../../components/back_office/layouts/BackOfficeLayout";
import SubLayoutRight from "../../../components/back_office/layouts/SubLayoutRight";
import axios from "axios";
import { useState, useContext } from "react";
import style from "../../../styles/back_office/pages/onePage.module.css";
import RichTextExample from "../../../components/generic/wysiwyg/RichText";
import SimpleField from "../../../components/back_office/pages/contentPage/SimpleField";
import SubLayoutContentPage from "../../../components/back_office/pages/contentPage/SubLayoutContentPage";
import { getSession } from "next-auth/react";
import {
  capitalizeFirstLetter,
  JSONParseAllProps,
} from "../../../services/utils";
import { useRouter } from "next/router";
import { createBlankPage } from "../../../components/generic/wysiwyg/utils";
import { getOnePost } from "../../../services/api/post";

export async function getServerSideProps({ req, query, params }) {
  // Auth check
  // const session = await getSession({ req });
  // if (session) {
  //   // Signed in
  //   console.log("Session", JSON.stringify(session, null, 2));
  // } else {
  //   // Not Signed in
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //     props: {},
  //   };
  // }

  const { pid } = params;
  console.log("pid !== undefined", pid === undefined);

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

  return { props: { page, isCreationInit } };
}

const PostPage = ({ page, isCreationInit }) => {
  // is creation ?
  const router = useRouter();
  const { pid } = router.query;

  // si pid est défini, il est une array

  const [isCreation, setIsCreation] = useState(isCreationInit);

  let postId;
  if (!isCreation) {
    // On peut stocker une infinité de paramètres avec cette façon de faire ([[...pid]] donc on ne prends que le premier)
    postId = pid?.[0];
  }

  const [pageState, setPageState] = useState({ ...page });
  const [hasStateChanged, setHasStateChanged] = useState(false);

  console.log("page state", pageState);
  console.log("is creation ?", isCreation);

  const handleChangePage = (value, field) => {
    setHasStateChanged(true);
    setPageState({ ...pageState, [field]: value });
  };

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
          {page && (
            <div>
              <h1>{capitalizeFirstLetter(page?.name)}</h1>
              <div>
                <RichTextExample
                  value={pageState.content}
                  setValue={handleChangePage}
                  field="content"
                />
              </div>

              <div>
                <SimpleField
                  value={pageState.metaDescription}
                  setValue={handleChangePage}
                  title="Ceci est la description qui s'affiche sur Google lorsque votre site apparait dans les résultats."
                  field="metaDescription"
                />
                <SimpleField
                  value={pageState.title}
                  setValue={handleChangePage}
                  title="Le titre de votre page, qui apparait sur l'onglet de votre navigateur."
                  field="title"
                />
                <SimpleField
                  value={pageState.shortDescription}
                  setValue={handleChangePage}
                  title="short description"
                  field="shortDescription"
                />
              </div>
            </div>
          )}
          {!page && (
            <div>
              <h1>Page non trouvée</h1>
              <p>Avez-vous cliqué sur le bon lien ?</p>
            </div>
          )}
        </div>
      </SubLayoutRight>
    </BackOfficeLayout>
  );
};

export default PostPage;
