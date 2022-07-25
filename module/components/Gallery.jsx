import { useContext, useEffect, useState } from "react";
import ImageManagerContext from "../contexts/index";
import axios from "axios";

const Gallery = () => {
  const { galleryProperties } = useContext(ImageManagerContext);
  const { axiosHeadersFetchGallery, urlFetchImages } = galleryProperties;
  const [imagesGallery, setImagesGallery] = useState([]);

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
//
// A chaque clic sur Gallery, un call API est fait pour charger
// On peut sélectionner une ou plusieurs images
// Pagination
// Select renvoie les ID des images
