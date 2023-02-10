"use client";

import SimpleField from "../pages/contentPage/SimpleField";
import RichTextExample from "../../generic/wysiwyg/RichText";
import MessageIcon from "../../../assets/svg/add_a_photo/round.svg";
import { previewImageUrl } from "../../../services/imageUtils";
import {
  capitalizeFirstLetter,
  transformValueToReactSelectValue,
} from "../../../services/utils";
import style from "./PostWysiwyg.module.scss";
import { useImageManager } from "react-image-manager";
import {
  calculateLengthOfSimpleField,
  formatSimple,
} from "../../../services/react-slate";
import { arrayLangsInApp } from "../../../i18n/allLang";
import SiblingSelector from "../SiblingSelector/SiblingSelector";
import Select from "react-select";

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

  const handleChangeLanguage = (value) => {
    setHasStateChanged(true);
    setPageState({ ...pageState, language: value.value });
  };

  const showError = calculateLengthOfSimpleField(pageState.title) === 0;

  const {
    isDisplayedImageManager,
    setIsDisplayedImageManager,
    setOnValidationCallBack,
    setMinWidthImageUpload,
    setNewCropAspectRatio,
  } = useImageManager();

  const languageoptions = arrayLangsInApp.map((lang) => ({
    value: lang.locale,
    label: lang.locale,
  }));

  return (
    <div className={`${style.articleContainer}`}>
      {page && (
        <div className={`h1`}>
          <h1 className={`h1 ${style.articleContainer__title}`}>
            Article n°{capitalizeFirstLetter(pageState?.id)}
          </h1>
          <div className={style.editableElement}>
            <h2 className="h2">Titre</h2>
            <SimpleField
              value={pageState.title}
              setValue={handleChangePage}
              title="Le titre de l'article"
              field="title"
              showError={showError}
            />
          </div>
          <div>
            <p>Language</p>
            <Select
              className="basic-single"
              classNamePrefix="select"
              onChange={handleChangeLanguage}
              name="language"
              options={languageoptions}
              value={transformValueToReactSelectValue(
                pageState.language,
                pageState.language
              )}
            />
          </div>
          <div className={style.editableElement}>
            <h2 className="h2">Image Principale</h2>
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
                console.log("clicked on RIM");
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
            <h2 className="h2">Contenu</h2>
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
          {/* TODO : vérifier la cohérence des langues des siblings à la sauvegarde */}
          <div>
            <h3>Siblings</h3>
            <ul>
              <li> Ajouter un sibling </li>

              {/* Now : Puis mettre le resultat en option du select
              Now : Puis handleChange le select pour avoir id et nom de l'article en state + id de l'article en sibling */}
              {Array.isArray(pageState.Sibling) &&
                pageState.Sibling.map((sibling, index) => {
                  return (
                    <SiblingSelector
                      isPreloaded
                      sibling={sibling}
                      languageAvailables={languageoptions}
                      pageState={pageState}
                      setPageState={setPageState}
                      setHasStateChanged={setHasStateChanged}
                    />
                  );
                })}
              <li> Retirer un sibling</li>
            </ul>
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
  );
};

export default PostWysiwyg;
