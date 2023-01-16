import BackOfficeLayout from "../../../components/back_office/layouts/BackOfficeLayout";
import SubLayoutRight from "../../../components/back_office/layouts/SubLayoutRight";
import SubLayoutContentPage from "../../../components/back_office/pages/contentPage/SubLayoutContentPage";
import { JSONParseAllProps } from "../../../services/utils";
import { createBlankPage } from "../../../components/generic/wysiwyg/utils";
import { getOnePost } from "../../../services/api/post";
import { calculateLengthOfSimpleField } from "../../../services/react-slate";

import PostWysiwyg from "../../../../components/back_office/PostWysiwyg/PostWysiwyg";

//TODO : ce compo fait trop de trucs, il faudrait le refacto/décomposer un petit peu
// Il gère un post en state mais ce n'est jamais défini nulle part. Il faudrait tout typer sur le post, instancier un post
// Pareil pour la fonction sauvegarde dans SubLayoutContentPage. Il faudrait faire une factory autour pour qu'elle puisse tout sauvegarder, y compris un Post

export async function getServerSideProps(context) {
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
  const { params } = context;
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

export async function PostPage({ params }) {
  // is creation ?
  const { pid } = params;

  // checked

  // si pid est défini, il est une array

  const [isCreation, setIsCreation] = useState(isCreationInit);

  let postId;
  if (!isCreation) {
    // On peut stocker une infinité de paramètres avec cette façon de faire ([[...pid]] donc on ne prends que le premier)
    postId = pid?.[0];
  }

  const [pageState, setPageState] = useState({ ...page });
  const [hasStateChanged, setHasStateChanged] = useState(false);
  const [isConditionnalCompoDisplayed, setIsConditionnalCompoDisplayed] =
    useState(false);

  console.log("page state", pageState);
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

  const showError = calculateLengthOfSimpleField(pageState.title) === 0;

  useEffect(() => {
    setIsConditionnalCompoDisplayed(true);
  }, []);

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
          <PostWysiwyg page={page} />
        </div>
      </SubLayoutRight>
    </BackOfficeLayout>
  );
}
