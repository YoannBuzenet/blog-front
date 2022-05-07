import axios from "axios";
import SwitchWithLabel from "../../../generic/Switch/index";
import BasicButton from "../../../generic/Buttons/Button";
import React, { useEffect, useState } from "react";
import { routes } from "../../../../routing/routes";
import { JSONStringifyAllProps } from "../../../../services/utils";
import { toast } from "react-toastify";
import { usePreventUserFromErasingContent } from "../../../../hooks/hooks";

const SubLayoutContentPage = ({
  hasStateChanged,
  setHasStateChanged,
  pageState,
  setPageState,
  isCreation,
  setIsCreation,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const savePage = async () => {
    const httpVerb = isCreation ? "post" : "put";

    const url = routes.api.entities.post?.[httpVerb].build(pageState.id);

    const objectToSend = JSONStringifyAllProps(pageState);

    setIsLoading(true);
    try {
      const serverResp = await axios?.[httpVerb](url, objectToSend, {});
      console.log("serverResp", serverResp);

      setPageState({ ...pageState, id: serverResp.id });

      setHasStateChanged(false);

      // Removing the alert window function
      window.onbeforeunload = () => {};

      toast.success("La page a bien été sauvegardée.");

      // Passing in edit mode
      setIsCreation("false");
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
          isDisabled={!hasStateChanged}
          handleClick={savePage}
          isLoading={isLoading}
          iconToDisplay="save"
        />
      </div>
    </>
  );
};

export default SubLayoutContentPage;
