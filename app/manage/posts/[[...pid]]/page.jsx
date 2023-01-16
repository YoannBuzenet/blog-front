"use client";
import BackOfficeLayout from "../../../components/back_office/layouts/BackOfficeLayout";
import SubLayoutRight from "../../../components/back_office/layouts/SubLayoutRight";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
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
import {
  calculateLengthOfSimpleField,
  formatSimple,
  parseSlateFormatSimple,
} from "../../../services/react-slate";
import MessageIcon from "../../../assets/svg/add_a_photo/round.svg";
import { previewImageUrl } from "../../../services/imageUtils";

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

  // const session = await unstable_getServerSession(
  //   context.req,
  //   context.res
  // );

  //TODO check si ça marche, si oui utiliser le vrai userId
  // console.log('session server side ?', session)

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

  const handleChangePage = (value, field) => {
    console.log("jai ete appele", value, field);
    setHasStateChanged(true);
    setPageState({ ...pageState, [field]: value });
  };

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
          {page && (
            <div>
              <h1>Article n°{capitalizeFirstLetter(pageState?.id)}</h1>
              <div className={style.editableElement}>
                <h2>Titre</h2>
                <SimpleField
                  value={pageState.title}
                  setValue={handleChangePage}
                  title="Le titre de l'article"
                  field="title"
                  showError={showError}
                />
              </div>
              <div className={style.editableElement}>
                <h2>Image Principale</h2>
                {/* eslint-disable */}
                {/* le linter veut qu'on utilise le compo Image next - no way ici ! */}
                <div className={style.mainPicture}>
                  <img src={previewImageUrl(pageState.mainImageUrl)} />
                </div>
                {/* eslint-enable */}
                <SimpleField
                  value={pageState.mainImageUrl}
                  setValue={handleChangePage}
                  title="URL de l'image en tête d'article"
                  field="mainImageUrl"
                  handleClickCTA={async (e) => {
                    const getImageManager = async () => {
                      import("react-image-manager").then((module) => {
                        return module.useImageManager;
                      });
                    };
                    const useImageManager = await getImageManager();
                    const {
                      isDisplayedImageManager,
                      setIsDisplayedImageManager,
                      setOnValidationCallBack,
                      setMinWidthImageUpload,
                      setNewCropAspectRatio,
                    } = useImageManager();
                    // setOnValidationCallBack((arrayOfImages) => {
                    //   if (Array.isArray(arrayOfImages)) {
                    //     const image = arrayOfImages[0];
                    //     const url = image.path;
                    //     const slateUrl = formatSimple(url);
                    //     const slateURLParsed = JSON.parse(slateUrl);
                    //     handleChangePage(slateURLParsed, "mainImageUrl");
                    //   }
                    // });
                    // setMinWidthImageUpload(null);
                    // setIsDisplayedImageManager(true);
                    // setNewCropAspectRatio(2);
                  }}
                  svgCTA={MessageIcon}
                />
              </div>
              <div className={style.editableElement}>
                <h2>Contenu</h2>
                <RichTextExample
                  value={pageState.content}
                  setValue={handleChangePage}
                  field="content"
                />
              </div>
              <div className={style.editableElement}>
                <h2>Description Courte</h2>
                <SimpleField
                  value={pageState.shortDescription}
                  setValue={handleChangePage}
                  title="Description courte"
                  field="shortDescription"
                />
              </div>

              <div>
                <h3>SEO</h3>
                <SimpleField
                  value={pageState.metaDescription}
                  setValue={handleChangePage}
                  // TODO TRANSLATE
                  title="Ceci est la description qui s'affiche sur Google lorsque votre site apparait dans les résultats."
                  field="metaDescription"
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
