import escapeHtml from "escape-html";
import { Text } from "slate";

const serialize = (node) => {
  console.log("le node", node);
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

  const children = node?.children?.map((n) => serialize(n)).join("");

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
    default:
      return children;
  }
};

function wrapJSONArrayReactSlate(arrayOfObjectsReactSlate) {
  return { children: arrayOfObjectsReactSlate };
}

export { serialize, wrapJSONArrayReactSlate };
