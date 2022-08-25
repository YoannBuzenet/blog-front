import escapeHtml from "escape-html";
import { Text } from "slate";

const serialize = (node) => {
  if (Text.isText(node)) {
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

export { serialize, wrapJSONArrayReactSlate, calculateLengthOfSimpleField };
