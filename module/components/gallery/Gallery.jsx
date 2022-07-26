import { useContext } from "react";
import ImageManagerContext from "../../contexts/index";
import Card from "./Card";

const Gallery = () => {
  const { galleryProperties } = useContext(ImageManagerContext);
  const { galleryImages } = galleryProperties;

  console.log("galleryImages", galleryImages);

  return (
    <div>
      <div>Gallery</div>
      <div>
        {galleryImages.map((image, index) => (
          <Card image={image} key={index} />
        ))}
      </div>
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
