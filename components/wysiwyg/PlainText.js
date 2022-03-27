import React, { useState, useMemo, useRef } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";

const PlainTextEditor = ({ value, setValue, field }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div
      className="wysiwyg_container plainText"
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
        <Editable placeholder="Entrez votre texte ici..." className="wysiwyg" />
      </Slate>
    </div>
  );
};

export default PlainTextEditor;
