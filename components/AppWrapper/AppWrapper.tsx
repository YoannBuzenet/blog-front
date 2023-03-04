"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { fetchAllImagesWithPathUpdated } from "../../services/api/image";
import { ImageManagerContainer } from "react-image-manager";

const AppWrapper = ({
  appCurrentLang,
  imagesGallerie,
  setImagesGallerie,
  tags,
  children,
}) => {
  const { data: session, status } = useSession();
  //console.log("wrapper SESSION là: contenu session", session);

  // Preloading Twitter widget so we can access it directly
  // If not preloaded, we can't load tweets client side.
  React.useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, []);

  return (
    <>
      <ImageManagerContainer
        cropAspectRatio={2}
        urlUpload={`${process.env.NEXT_PUBLIC_API_URL}/api/entities/images`}
        minWidthImageUploadInitial={700}
        enabledModes={["upload", "gallery"]}
        imageFields={[
          {
            type: "input",
            name: "name",
            isRequired: true,
          },
          {
            type: "input",
            name: "credits",
          },
          {
            type: "dropdown",
            name: "language",
            keys: [
              { label: "en-US", value: "en-US" },
              { label: "fr-FR", value: "fr-FR" },
            ],
            isRequired: true,
            defaultValue: { label: "en-US", value: "en-US" },
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
        globalOnSelectImages={(arrayOfSelectedImages) => {}}
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
