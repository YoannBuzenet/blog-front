import escapeHtml from "escape-html";
import { Text } from "slate";
import { ReactSlateElement } from "../components/back_office/posts/ManageStateContainer/types";

const slateConstants = {
  paragraph: "paragraph",
  blockQuote: "block-quote",
  h1: "heading-one",
  h2: "heading-two",
  numberedList: "numbered-list",
  bulletList: "bulleted-list",
};

const serialize = (node) => {
  if (Text.isText(node) as any) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    if (node.code) {
      string = `<pre>${string}</pre>`;
    }
    return string;
  }

  const children =
    Array.isArray(node?.children) && // On mets une securité, sinon ça throw quand c'est pas au format Slate (array d'objets)
    node?.children?.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "block-quote":
      return `<blockquote>${children}</blockquote>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    case "youtube":
      return `<div class="iframeContainer"><iframe width="800" height="450" src="https://www.youtube.com/embed/${escapeHtml(
        node.urlYoutube
      )}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
    case "image":
      return `<div class="imageDisplay" data-lang=${node.language}>
                <img src="${escapeHtml(node.src)}">
                <p>${children}</p>
              </div>`;
    default:
      return children;
  }
};

function wrapJSONArrayReactSlate(arrayOfObjectsReactSlate) {
  return { children: arrayOfObjectsReactSlate };
}

function calculateLengthOfSimpleField(simpleFieldObject) {
  const stringToCheck = simpleFieldObject?.[0]?.children?.[0]?.text;
  return stringToCheck.length;
}

const createBlock = ({ type, children }) => {
  //if children is not an array, just put it
  if (!Array.isArray(children)) {
    return `{ "type":"${slateConstants[type]}", "children": [{"text" :"${children}"}]}`;
  }

  return `{ "type": "${slateConstants[type]}", "children": [${children.map(
    (child) => createChild({ text: child.text, options: child.options })
  )}]}`;
};

const createChild = ({ text, options }) => {
  const objectToStringify = { text };

  if (Array.isArray(options)) {
    for (const style of options) {
      objectToStringify[style] = true;
    }
  } else {
    objectToStringify[options] = true;
  }

  const objectStringified = JSON.stringify(objectToStringify);

  return objectStringified;
};

const formatSimple = (text) => {
  return `[${createBlock({ type: "paragraph", children: text })}]`;
};

const parseSlateFormatSimple = (
  slateFormatSimple: ReactSlateElement[] | string
): string => {
  if (typeof slateFormatSimple === "string") {
    return slateFormatSimple;
  }

  const stringIncluded = slateFormatSimple?.[0]?.children?.[0]?.text;
  return stringIncluded;
};

export {
  serialize,
  wrapJSONArrayReactSlate,
  calculateLengthOfSimpleField,
  formatSimple,
  parseSlateFormatSimple,
};
