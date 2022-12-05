import React from "react";
import { useSession } from "next-auth/react";
import { ImageManagerContainer } from "react-image-manager";
import { toast } from "react-toastify";
import { fetchAllImagesWithPathUpdated } from "../../services/api/image";

//TODO passer le wrapper d'imageContainer avec ses dépendances pour avoir accès à useSession pour passer la data en payload

const AppWrapper = ({
  appCurrentLang,
  imagesGallerie,
  setImagesGallerie,
  tags,
  children,
}) => {
  const { data: session, status } = useSession();
  console.log("wrapper là", session);
  return (
    <>
      <ImageManagerContainer
        cropAspectRatio={2}
        urlUpload={`${process.env.NEXT_PUBLIC_API_URL}/api/entities/images`}
        minWidthImageUploadInitial={700}
        enabledModes={["gallery", "upload"]}
        imageFields={[
          {
            name: "name",
            isRequired: true,
          },
          {
            name: "credits",
          },
        ]}
        onSuccessUpload={() => {
          toast.success(<p>L&apos;image a bien été uploadée.</p>);
          // Maj Gallerie
          fetchAllImagesWithPathUpdated().then((resp) => {
            setImagesGallerie(resp);
          });
        }}
        onFailureupload={() =>
          toast.error(<p>L&apos;image a bien n&apos;a pu être uploadée.</p>)
        }
        onFailureuploadImageTooSmall={(minWidth) => {
          toast.error(
            <p>L&apos;image adoit avoir une largeur minimum de {minWidth}px.</p>
          );
        }}
        onSelectImages={(arrayOfSelectedImages) => {}}
        galleryImages={imagesGallerie}
        tagList={tags}
        withTags
        customPropsToPass={{ language: appCurrentLang?.locale }}
        additionalPayloadUpload={{
          token: session?.user?.googleAccessToken,
          provider: session?.user?.provider,
          UserId: session?.user?.id,
        }}
      >
        {children}
      </ImageManagerContainer>
    </>
  );
};

export default AppWrapper;
