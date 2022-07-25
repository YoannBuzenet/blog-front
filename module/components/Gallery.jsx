import { useContext, useEffect, useState } from "react";
import ImageManagerContext from "../contexts/index";
import axios from "axios";

const Gallery = () => {
  const { galleryProperties } = useContext(ImageManagerContext);
  const { axiosHeadersFetchGallery, urlFetchImages } = galleryProperties;
  const [imagesGallery, setImagesGallery] = useState([
    "https://www.widoobiz.com/wp-content/uploads/2020/07/ariane-1000x568.jpeg",
  ]);

  useEffect(() => {
    if (!urlFetchImages) {
      console.error("urlFetchImages is mandatory to fetch images from server.");
      return;
    }

    axios
      .post(urlFetchImages, {
        ...axiosHeadersFetchGallery,
      })
      .then((resp) => setImagesGallery(resp.data))
      .catch((e) =>
        console.error("Error while fetching images in gallery : ", e)
      );
  }, []);

  return <>Gallery</>;
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
