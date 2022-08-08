import { useContext, useEffect, useState } from "react";
import config from "../../config/config";
import ImageManagerContext from "../../contexts/index";
import { useWindowDimensions } from "../../hooks/hooks";
import { useCustomizedStyle } from "../../style/gallery";
import { getNearestBreakPoint } from "../../utils";
import Card from "./Card";
import ReactPaginate from "react-paginate";

const Gallery = () => {
  const { galleryProperties } = useContext(ImageManagerContext);
  const { galleryImages, canSelectSeveralImages, onSelectImages } =
    galleryProperties;

  // We compute the number of images we want to displaye, following screen size.
  const { width } = useWindowDimensions();
  const relevantBreakPoint = getNearestBreakPoint(width);
  const numberOfImagesDisplayed =
    config.gallery.imagePerSizeScreen[relevantBreakPoint];

  const numberOfPages =
    Math.round(galleryImages.length / numberOfImagesDisplayed) + 1;

  // console.log("galleryImages", galleryImages);
  // console.log("numberOfPages", numberOfPages);
  console.log("numberOfImagesDisplayed", numberOfImagesDisplayed);
  console.log("galleryImages.length", galleryImages.length);
  // console.log("relevantBreakPoint", relevantBreakPoint);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + numberOfImagesDisplayed;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(galleryImages.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(galleryImages.length / numberOfImagesDisplayed));
  }, [itemOffset, numberOfImagesDisplayed]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * numberOfImagesDisplayed) % galleryImages.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

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

  const handleSelectImages = (e, imagesSelected) => {
    onSelectImages(imagesSelected);
  };

  const classes = useCustomizedStyle()();

  console.log("selectedImages", selectedImages);

  console.log("pageCount", pageCount);

  return (
    <div className={classes.galleryContainer}>
      <div className={classes.galleryImageContainer}>
        {currentItems.map((image, index) => (
          <Card
            image={image}
            key={index}
            selectedImages={selectedImages}
            setSelectedImages={handleSetSelectedImages}
          />
        ))}
      </div>
      <div className={classes.validationButtonContainer}>
        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
        <div>
          <button
            className="customFileInput"
            onClick={(e) => handleSelectImages(e, selectedImages)}
            disabled={selectedImages.length === 0}
          >
            Valider
          </button>
        </div>
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
// Pagination
// Select renvoie les ID des images
