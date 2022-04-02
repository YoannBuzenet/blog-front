function JSONParseAllProps(objectToParse, objectToReturn = {}) {
  for (const prop in objectToParse) {
    if (typeof objectToParse[prop] === "string") {
      try {
        const parsedProp = JSON.parse(objectToParse[prop]);
        objectToReturn[prop] = parsedProp;
      } catch (e) {
        objectToReturn[prop] = objectToParse[prop];
      }
    } else if (
      typeof objectToParse[prop] === "object" &&
      objectToParse[prop] !== null &&
      !Array.isArray(objectToParse[prop])
    ) {
      objectToReturn[prop] = JSONParseAllProps(objectToParse[prop]);
    } else if (
      typeof objectToParse[prop] === "object" &&
      objectToParse[prop] !== null &&
      Array.isArray(objectToParse[prop])
    ) {
      objectToReturn[prop] = [];
      // Handle array
      for (let i = 0; i < objectToParse[prop].length; i++) {
        objectToReturn[prop] = [
          ...objectToReturn[prop],
          JSONParseAllProps(objectToParse[prop][i]),
        ];
      }
    } else {
      objectToReturn[prop] = objectToParse[prop];
    }
  }

  return objectToReturn;
}

function JSONStringifyAllProps(object) {
  const stringifiedPropObject = {};

  for (const prop in object) {
    if (typeof object[prop] !== "string") {
      try {
        const parsedProp = JSON.stringify(object[prop]);
        stringifiedPropObject[prop] = parsedProp;
      } catch (e) {
        stringifiedPropObject[prop] = object[prop];
      }
    } else {
      stringifiedPropObject[prop] = object[prop];
    }
  }

  return stringifiedPropObject;
}

module.exports = {
  JSONParseAllProps,
  JSONStringifyAllProps,
};
