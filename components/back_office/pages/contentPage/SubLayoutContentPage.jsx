import axios from "axios";
import SwitchWithLabel from "../../../generic/Switch/index";
import BasicButton from "../../../generic/Buttons/Button";
import React, { useEffect, useState } from "react";
import { routes } from "../../../../routing/routes";
import {
  JSONParseAllProps,
  JSONStringifyAllProps,
} from "../../../../services/utils";
import { toast } from "react-toastify";
import { usePreventUserFromErasingContent } from "../../../../hooks/hooks";
import { calculateLengthOfSimpleField } from "../../../../services/react-slate";

const SubLayoutContentPage = ({
  hasStateChanged,
  setHasStateChanged,
  pageState,
  setPageState,
  isCreation,
  setIsCreation,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  console.log("is creation from sublayout", isCreation);

  const httpVerb = isCreation ? "post" : "put";
  console.log("http verb", httpVerb);
  const isErrorName = calculateLengthOfSimpleField(pageState.title) === 0;

  const savePage = async () => {
    const url = routes.api.entities.post?.[httpVerb].build(pageState.id);

    const objectToSend = JSONStringifyAllProps(pageState);

    setIsLoading(true);
    try {
      const serverResp = await axios?.[httpVerb](url, objectToSend, {});
      const servRespParsed = JSONParseAllProps(serverResp);
      console.log("serverResp", serverResp);
      console.log("servRespParsed", servRespParsed);

      setPageState(servRespParsed.data);

      setHasStateChanged(false);

      // Removing the alert window function
      window.onbeforeunload = () => {};

      toast.success("La page a bien été sauvegardée.");

      // Passing in edit mode
      setIsCreation(false);
    } catch (error) {
      toast.error(
        "ERREUR - La page n'a pu être sauvegardée. Merci de réessayer ultérieurement. Pensez à copier-coller vos modifications dans un fichier en attendant, pour ne pas les perdre !"
      );
    } finally {
      setIsLoading(false);
    }
  };

  usePreventUserFromErasingContent(hasStateChanged);

  const switchLabel = pageState.isVisibleToUser ? "Visible" : "Masquée";

  return (
    <>
      <h2>Sub Layout</h2>
      <p>Pour vos clients, cette page est actuellement :</p>
      <SwitchWithLabel
        label={switchLabel}
        isChecked={pageState.isVisibleToUser}
        handleChange={(e) => {
          setHasStateChanged(true);
          setPageState({
            ...pageState,
            isVisibleToUser: !pageState.isVisibleToUser,
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
