import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate, ReactEditor } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import Format_bold from "../../../assets/svg/format_bold/baseline.svg";
import Format_italic from "../../../assets/svg/format_italic/baseline.svg";
import Format_underline from "../../../assets/svg/format_underlined/baseline.svg";
import Code from "../../../assets/svg/code/baseline.svg";
import Looks_one from "../../../assets/svg/looks_one/baseline.svg";
import Looks_two from "../../../assets/svg/looks_two/baseline.svg";
import Format_quote from "../../../assets/svg/format_quote/baseline.svg";
import Format_list_numbered from "../../../assets/svg/format_list_numbered/baseline.svg";
import Format_list_bulleted from "../../../assets/svg/format_list_bulleted/baseline.svg";
import Image_SVG from "../../../assets/svg/image/baseline.svg";
import { Button, Toolbar } from "./components/components";
import colorsVariable from "../../../styles/generic/colors.module.scss";
import { useImageManager } from "react-image-manager";
import { EXAMPLE_IMAGE_URL } from "../../../debug/consts";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const handleClickImageModule = (setIsDisplayedImageManager) => {
  // Set un handler d'image ici en contexte pour récupérer la data ?

  setIsDisplayedImageManager(true);
  // toggleBlock();
  // toggleBlock(editor, format);
};

const RichText = ({ value, setValue, field }) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { isDisplayedImageManager, setIsDisplayedImageManager } =
    useImageManager();

  return (
    <div
      className="wysiwyg_container"
      onClick={(e) => {
        setTimeout(() => {
          ReactEditor.focus(editor);
        }, 50);
      }}
    >
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value, field)}
      >
        <Toolbar className={"wysiwyg_toolbar"}>
          <MarkButton
            format="bold"
            SvgIcon={Format_bold}
            title="Mettre en gras"
          />
          <MarkButton
            format="italic"
            SvgIcon={Format_italic}
            title="Mettre en italique"
          />
          <MarkButton
            format="underline"
            SvgIcon={Format_underline}
            title="Souligner"
          />
          <MarkButton format="code" SvgIcon={Code} title="Mettre du code" />
          <BlockButton
            format="heading-one"
            SvgIcon={Looks_one}
            title="Mettre en gros titre"
          />
          <BlockButton
            format="heading-two"
            SvgIcon={Looks_two}
            title="Mettre en titre moyen"
          />
          <BlockButton
            format="block-quote"
            SvgIcon={Format_quote}
            title="Intégrer une citation"
          />
          <BlockButton
            format="numbered-list"
            SvgIcon={Format_list_numbered}
            title="Créer une liste avec des numéros"
          />
          <BlockButton
            format="bulleted-list"
            SvgIcon={Format_list_bulleted}
            title="Créer une liste à puce"
          />
          <CustomButton
            handleClick={() =>
              handleClickImageModule(setIsDisplayedImageManager)
            }
            format="image"
            SvgIcon={Image_SVG}
            title="Images"
          />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  console.log("element reçu", element);
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "image":
      return (
        <div contentEditable={false} style={{ textAlign: "center" }}>
          {/* eslint-disable */}
          <img {...attributes} src={EXAMPLE_IMAGE_URL} width="500px" />
          {/* eslint-enable */}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, SvgIcon, title }) => {
  const editor = useSlate();

  const isActive = isBlockActive(editor, format);

  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      title={title}
    >
      <SvgIcon
        fill={
          isActive
            ? colorsVariable.wysiwygStrongGrey
            : colorsVariable.wysiwygLightGrey
        }
      />
    </Button>
  );
};

const MarkButton = ({ format, SvgIcon, title }) => {
  const editor = useSlate();

  const isActive = isMarkActive(editor, format);

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      title={title}
    >
      <SvgIcon
        fill={
          isActive
            ? colorsVariable.wysiwygStrongGrey
            : colorsVariable.wysiwygLightGrey
        }
      />
    </Button>
  );
};
const CustomButton = ({
  handleClick,
  SvgIcon,
  title,
  format,
  isToggleMark,
}) => {
  const editor = useSlate();

  const toggleFunction = isToggleMark ? toggleMark : toggleBlock;

  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
        // handleClick();
      }}
      title={title}
    >
      <SvgIcon fill={colorsVariable.wysiwygLightGrey} />
    </Button>
  );
};
export default RichText;
