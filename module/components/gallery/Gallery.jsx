import { useContext, useState } from "react";
import ImageManagerContext from "../../contexts/index";
import { useCustomizedStyle } from "../../style/gallery";
import Card from "./Card";

const Gallery = () => {
  const { galleryProperties } = useContext(ImageManagerContext);
  const { galleryImages, canSelectSeveralImages } = galleryProperties;

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
      setSelectedImages([hash]);
    }
  };

  const classes = useCustomizedStyle()();

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
// A chaque clic sur Gallery, un call API est fait pour charger
// On peut sélectionner une ou plusieurs images
// Pagination
// Select renvoie les ID des images
