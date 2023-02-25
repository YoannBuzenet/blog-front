"use client";

import axios from "axios";
import SwitchWithLabel from "../../../generic/Switch/index";
import BasicButton from "../../../generic/Buttons/GenericButton/GenericButton";
import React, { Dispatch, useState } from "react";
import { routes } from "../../../../routing/routes";
import {
  JSONParseAllProps,
  JSONStringifyAllProps,
} from "../../../../services/utils";
import { toast } from "react-toastify";
import { usePreventUserFromErasingContent } from "../../../../hooks/hooks";
import { calculateLengthOfSimpleField } from "../../../../services/react-slate";
import { useSession } from "next-auth/react";
import { PageState } from "../../posts/ManageStateContainer/types";
import { PageStateActions } from "../../posts/ManageStateContainer/PostManageStateContainer.reducer";

type SubLayoutContentPageProps = {
  hasStateChanged: boolean;
  setHasStateChanged: Dispatch<React.SetStateAction<boolean>>;
  pageState: PageState;
  dispatch: Dispatch<PageStateActions>;
  isCreation: boolean;
  setIsCreation: Dispatch<React.SetStateAction<boolean>>;
};

const SubLayoutContentPage = ({
  hasStateChanged,
  setHasStateChanged,
  pageState,
  dispatch,
  isCreation,
  setIsCreation,
}: SubLayoutContentPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  console.log("is creation from sublayout", isCreation);

  const httpVerb = isCreation ? "post" : "put";
  console.log("http verb", httpVerb);
  const isErrorName = calculateLengthOfSimpleField(pageState.title) === 0;

  // TODO -> Vérifier la cohérence des informations, notamment : les langues des siblings VS la langue du post, aucune ne doit être similaire

  const savePage = async () => {
    const url = routes.api.entities.post?.[httpVerb].build(pageState.id);

    const objectToSend = JSONStringifyAllProps({
      ...pageState,
      token: session.user.googleAccessToken,
      provider: session.user.provider,
    });

    setIsLoading(true);
    try {
      const serverResp = await axios?.[httpVerb](url, objectToSend, {});
      const servRespParsed = JSONParseAllProps(serverResp);
      console.log("serverResp", serverResp);
      console.log("servRespParsed", servRespParsed);

      dispatch({
        type: "setCompletePageState",
        value: servRespParsed.data,
      });

      setHasStateChanged(false);

      // Removing the alert window function
      window.onbeforeunload = () => {};

      toast.success(<p>La page a bien été sauvegardée.</p>);

      // Passing in edit mode
      setIsCreation(false);
    } catch (error) {
      //TODO translate
      toast.error(
        <p>
          ERREUR - La page n'a pu être sauvegardée. Merci de réessayer
          ultérieurement. Pensez à copier-coller vos modifications dans un
          fichier en attendant, pour ne pas les perdre !
        </p>
      );
    } finally {
      setIsLoading(false);
    }
  };

  usePreventUserFromErasingContent(hasStateChanged);

  const switchLabel = pageState.isPublished ? "Visible" : "Masquée";

  return (
    <>
      <h2 className="h2">Sub Layout</h2>
      <p>Pour vos clients, cette page est actuellement :</p>
      <SwitchWithLabel
        label={switchLabel}
        isChecked={pageState.isPublished}
        handleChange={(e) => {
          setHasStateChanged(true);
          dispatch({
            type: "updateField",
            field: "isPublished",
            value: !pageState.isPublished,
          });
        }}
      />
      <div>
        <BasicButton
          text="Sauvegarder"
          color={hasStateChanged ? "primary" : "secondary"}
          isDisabled={!hasStateChanged || isErrorName}
          handleClick={savePage}
          isLoading={isLoading}
          iconToDisplay="save"
        />
      </div>
    </>
  );
};

export default SubLayoutContentPage;
