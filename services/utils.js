function JSONParseAllProps(objectToParse) {
  let objectToReturn;
  if (Array.isArray(objectToParse)) {
    objectToReturn = [];
    for (const item of objectToParse) {
      objectToReturn = [JSONParseAllProps(item), ...objectToReturn];
    }
  } else {
    objectToReturn = {};
  }

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

function capitalizeFirstLetter(string) {
  if (!string) {
    return "String received as Undefined in capitalizeFirstLetter()";
  }
  if (typeof string !== "string") {
    string += "";
  }
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

function isObjectEmpty(object = {}) {
  return Object.keys(object).length === 0;
}

function transformValueToReactSelectValue(value, label){
  return {
    value, label
  }
}

function debounce(func, wait, immediate) {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  var timeout;

  // Calling debounce returns a new anonymous function
  return function() {
    // reference the context and args for the setTimeout function
    var context = this,
      args = arguments;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    var callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this
    //   function several times, but it will only execute once
    //   (before or after imposing a delay).
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(function() {

      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments
        //    (both captured before setTimeout)
        func.apply(context, args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function...
    if (callNow) func.apply(context, args);
  }
}
// https://gist.github.com/codeguy/6684588
const slugify = (...args) => {
  const value = args.join(' ')

  let slug =  value
      .normalize('NFD') // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, '-') // separator

  if(slug.endsWith("-")){
      slug = slug.substring(0, slug.length - 1)
  }    

  return slug;
}
  
module.exports = {
  slugify
}



module.exports = {
  JSONParseAllProps,
  JSONStringifyAllProps,
  capitalizeFirstLetter,
  isObjectEmpty,
  transformValueToReactSelectValue,
  debounce,
  slugify
};
