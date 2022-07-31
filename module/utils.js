function getNearestBreakPoint(widthScreen) {
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
  } else {
    return 1201;
  }
}

module.exports = {
  getNearestBreakPoint,
};
