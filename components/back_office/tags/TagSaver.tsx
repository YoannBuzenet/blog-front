import axios from "axios";
import { cloneDeep } from "lodash";
import { useSession } from "next-auth/react";
import { routes } from "../../../routing/routes";
import GenericButton from "../../generic/Buttons/GenericButton/GenericButton";

const TagSaver = ({
  hasStateChanged,
  setHasStateChanged,
  tagsState,
  setTagState,
}) => {
  const { data: session, status } = useSession();

  const handleSaveTags = async () => {
    for (let i = 0; i < tagsState.length; i++) {
      const tag = tagsState[i];
      const url = routes.api.entities.tag?.put.build(tag.id);

      // Dans le tag, ajouter UserId et token/etc
      const objectToSend = {
        ...tag,
        token: session.user.googleAccessToken,
        provider: session.user.provider,
        UserId: 1,
      };

      if (tag.hasBeenModified) {
        const serverResp = await axios?.put(url, objectToSend, {});
        delete tag.hasBeenModified;
      }
    }
    setHasStateChanged(false);

    // On enregistre les modifications qui retirent la notion d'édition
    const tagStateCopy = cloneDeep(tagsState);
    setTagState(tagStateCopy);
  };

  return (
    <>
      <div>
        <GenericButton
          text="Sauvegarder"
          color={hasStateChanged ? "primary" : "secondary"}
          isDisabled={!hasStateChanged}
          handleClick={handleSaveTags}
          iconToDisplay="save"
        />
      </div>
    </>
  );
};

export default TagSaver;
