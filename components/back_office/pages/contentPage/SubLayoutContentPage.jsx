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
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // TO DO Later : allow POST for new pages
  const savePage = async () => {
    const url = routes.api.entities.page.put.build(pageState.id);

    const objectToSend = JSONStringifyAllProps(pageState);

    setIsLoading(true);
    try {
      const serverResp = await axios.put(url, objectToSend, {});
      setHasStateChanged(false);
      window.onbeforeunload = () => {};
      toast.success("La page a bien été sauvegardée.");
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
          handleClick={() => console.log("click!")}
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
