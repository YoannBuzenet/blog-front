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

module.exports = {
  getNearestBreakPoint,
};
