import BackOfficeLayout from "../../../components/back_office/layouts/BackOfficeLayout";
import SubLayoutRight from "../../../components/back_office/layouts/SubLayoutRight";
import axios from "axios";
import { useState, useContext } from "react";
import style from "../../../styles/back_office/pages/onePage.module.css";
import RichTextExample from "../../../components/generic/wysiwyg/RichText";
import SimpleField from "../../../components/back_office/pages/contentPage/SimpleField";
import SubLayoutContentPage from "../../../components/back_office/pages/contentPage/SubLayoutContentPage";
import { getSession } from "next-auth/react";
import { capitalizeFirstLetter } from "../../../services/utils";
import { useRouter } from "next/router";

export async function getServerSideProps({ req, query }) {
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

  const page = {
    content: [
      {
        type: "paragraph",
        children: [
          { text: "This is editable " },
          { text: "rich", bold: true },
          { text: " text, " },
          { text: "much", italic: true },
          { text: " better than a " },
          { text: "<textarea>", code: true },
          { text: "!" },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "Since it's rich text, you can do things like turn a selection of text ",
          },
          { text: "bold", bold: true },
          {
            text: ", or add a semantically rendered block quote in the middle of the page, like this:",
          },
        ],
      },
      {
        type: "block-quote",
        children: [{ text: "A wise quote." }],
      },
      {
        type: "paragraph",
        align: "center",
        children: [{ text: "Try it out for yourself!" }],
      },
    ],
    title: [
      {
        type: "paragraph",
        align: "center",
        children: [{ text: "title" }],
      },
    ],
    metaDescription: [
      {
        type: "paragraph",
        align: "center",
        children: [{ text: "metaDescription" }],
      },
    ],
    shortDescription: [
      {
        type: "paragraph",
        align: "center",
        children: [{ text: "shortDescription" }],
      },
    ],
    UserId: 1,
  };

  return { props: { page } };
}

const PostPage = ({ page }) => {
  // is creation ?
  const router = useRouter();
  const { pid } = router.query;

  console.log("pid !== undefined", pid === undefined);

  const [isCreation, setIsCreation] = useState(pid === undefined);

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
