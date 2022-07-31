import { useContext, useState } from "react";
import config from "../../config/config";
import ImageManagerContext from "../../contexts/index";
import { useWindowDimensions } from "../../hooks/hooks";
import { useCustomizedStyle } from "../../style/gallery";
import { getNearestBreakPoint } from "../../utils";
import Card from "./Card";

const Gallery = () => {
  const { galleryProperties } = useContext(ImageManagerContext);
  const { galleryImages, canSelectSeveralImages } = galleryProperties;

  // We compute the number of images we want to displaye, following screen size.
  const { width } = useWindowDimensions();
  const relevantBreakPoint = getNearestBreakPoint(width);
  const numberOfImagesDisplayed =
    config.gallery.imagePerSizeScreen[relevantBreakPoint];

  const numberOfPages = Math.round(
    galleryImages.length / numberOfImagesDisplayed
  );

  console.log("galleryImages", galleryImages);

  const [selectedImages, setSelectedImages] = useState([]);

  const handleSetSelectedImages = (hash) => {
    if (canSelectSeveralImages) {
      if (selectedImages.includes(hash)) {
        const indexString = selectedImages.indexOf(hash);
        const newArray = selectedImages.splice(indexString, 1);
        setSelectedImages(newArray);
      } else {
        setSelectedImages([...selectedImages, hash]);
      }
    } else {
      if (selectedImages.includes(hash)) {
        setSelectedImages([]);
      } else {
        setSelectedImages([hash]);
      }
    }
  };

  const classes = useCustomizedStyle()();

  console.log("selectedImages", selectedImages);

  return (
    <div className={classes.galleryImageContainer}>
      {galleryImages.map((image, index) => (
        <Card
          image={image}
          key={index}
          selectedImages={selectedImages}
          setSelectedImages={handleSetSelectedImages}
        />
      ))}
    </div>
  );
};

export default Gallery;

// NEXT : composant Card pour une image
// Comment on cherche dans la gallery par nom et tags ? il faut la data dans l'objet reçu, qui ne peut plus etre un simple string ?
// Fonction Recherche par la prop name
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
// Pagination
// Select renvoie les ID des images
