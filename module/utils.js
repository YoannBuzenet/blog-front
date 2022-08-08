function getNearestBreakPoint(widthScreen) {
  console.log("widthScreen", widthScreen);

  if (widthScreen < 320) {
    return 320;
  } else if (widthScreen < 480) {
    return 480;
  } else if (widthScreen < 768) {
    return 768;
  } else if (widthScreen < 1024) {
    return 1024;
  } else if (widthScreen < 1200) {
    return 1200;
  } else if (widthScreen < 1500) {
    return 1500;
  } else if (widthScreen < 2000) {
    return 2000;
  } else {
    return 2001;
  }
}

function removeDuplicateFromArrayOfImages(array) {
  if (!Array.isArray(array)) {
    throw new Error("Parameters must be an array.");
  }

  let dictionnaryOfUnicity = {};
  let uniqueArray = [];

  for (let i = 0; i < array.length; i++) {
    // If image is an object with name property
    if (array[i].name) {
      if (!dictionnaryOfUnicity[array[i].name]) {
        uniqueArray = [...uniqueArray, array[i]];
        dictionnaryOfUnicity[array[i].name] = true;
      }
    }
    // If image is just an url
    else {
      if (!dictionnaryOfUnicity[array[i]]) {
        uniqueArray = [...uniqueArray, array[i]];
        dictionnaryOfUnicity[array[i]] = true;
      }
    }
  }

  return uniqueArray;
}

module.exports = {
  getNearestBreakPoint,
  removeDuplicateFromArrayOfImages,
};
