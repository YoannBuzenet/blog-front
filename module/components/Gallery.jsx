import { useContext, useEffect, useState } from "react";
import ImageManagerContext from "../contexts/index";
import axios from "axios";

const Gallery = () => {
  const { galleryProperties } = useContext(ImageManagerContext);
  const { galleryImages } = galleryProperties;

  return (
    <div>
      <div>Gallery</div>
      <div>
        {galleryImages.map((image) => {
          if (typeof image === "string") {
            return <img src={image} />;
          } else if (typeof image === "object") {
            return "compo qui gère l'image";
          } else {
            console.error(
              "Image received can not be processed in the gallery. Please check the format."
            );
          }
        })}
      </div>
    </div>
  );
};

export default Gallery;

// NEXT : composant Card pour une image
// Comment on cherche dans la gallery par nom et tags ? il faut la data dans l'objet reçu, qui ne peut plus etre un simple string ?
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// A chaque clic sur Gallery, un call API est fait pour charger
// On peut sélectionner une ou plusieurs images
// Pagination
// Select renvoie les ID des images
