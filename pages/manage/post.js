import Layout from "../../components/back_office/Layouts/Layout";
import LayoutContentPage from "../../components/back_office/layouts/SubLayout";
import axios from "axios";
import { useState, useContext } from "react";
import style from "../../styles/back_office/pages/onePage.module.css";
import RichTextExample from "../../components/generic/wysiwyg/RichText";
import SimpleField from "../../components/back_office/pages/contentPage/SimpleField";
import SubLayoutContentPage from "../../components/back_office/pages/contentPage/SubLayoutContentPage";
import { getSession } from "next-auth/react";

export async function getServerSideProps({ req, query }) {
  // Auth check
  const session = await getSession({ req });
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2));
  } else {
    // Not Signed in
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: {},
    };
  }

  const page = { ok: "ok" };

  return { props: { page } };
}

const PostPage = ({ page }) => {
  const [pageState, setPageState] = useState({ ...page });
  const [hasStateChanged, setHasStateChanged] = useState(false);

  console.log("page state", pageState);

  const handleChangePage = (value, field) => {
    setHasStateChanged(true);
    setPageState({ ...pageState, [field]: value });
  };

  const styleCompo = {
    classic_back: {
      explainationParagraph: style.explainationParagraph,
      fieldContainer: style.fieldContainer,
    },
  };

  return (
    <Layout>
      <LayoutContentPage
        CompoToRender={SubLayoutContentPage}
        pageState={pageState}
        setPageState={setPageState}
        hasStateChanged={hasStateChanged}
        setHasStateChanged={setHasStateChanged}
      >
        <div className="contentPageContainer">
          {page && (
            <div>
              <h1>{capitalizeFirstLetter(page?.name)}</h1>
              <div>
                <RichTextExample
                  value={pageState.primaryContentField}
                  setValue={handleChangePage}
                  field="primaryContentField"
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
      </LayoutContentPage>
    </Layout>
  );
};

export default PostPage;
