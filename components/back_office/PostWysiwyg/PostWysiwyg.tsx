"use client";

import axios from "axios"; // TODO use fetch
import SimpleField from "../pages/contentPage/SimpleField";
import RichTextExample from "../../generic/wysiwyg/RichText";
import MessageIcon from "../../../assets/svg/add_a_photo/round.svg";
import { previewImageUrl } from "../../../services/imageUtils";
import { capitalizeFirstLetter } from "../../../services/utils";
import style from "./PostWysiwyg.module.scss";
import { getSession } from "next-auth/react";
import { useState, useContext, useEffect } from "react";
import {
  calculateLengthOfSimpleField,
  formatSimple,
} from "../../../services/react-slate";

const PostWysiwyg = ({
  page,
  isCreation,
  pid,
  pageState,
  setPageState,
  hasStateChanged,
  setHasStateChanged,
}) => {
  let postId;
  if (!isCreation) {
    // On peut stocker une infinité de paramètres avec cette façon de faire ([[...pid]] donc on ne prends que le premier)
    postId = pid?.[0];
  }

  console.log("page state", pageState);

  const handleChangePage = (value, field) => {
    console.log("jai ete appele", value, field);
    setHasStateChanged(true);
    setPageState({ ...pageState, [field]: value });
  };

  const showError = calculateLengthOfSimpleField(pageState.title) === 0;

  return (
    <>
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
                setOnValidationCallBack((arrayOfImages) => {
                  if (Array.isArray(arrayOfImages)) {
                    const image = arrayOfImages[0];
                    const url = image.path;
                    const slateUrl = formatSimple(url);
                    const slateURLParsed = JSON.parse(slateUrl);
                    handleChangePage(slateURLParsed, "mainImageUrl");
                  }
                });
                setMinWidthImageUpload(null);
                setIsDisplayedImageManager(true);
                setNewCropAspectRatio(2);
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
    </>
  );
};

export default PostWysiwyg;
