import React from "react";
import PropTypes from "prop-types";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { useFileText } from "../../hooks";
import { getFileName } from "../../utils/utils";
import { Button, RedButton } from "../Button";
import { EditorWrapper } from "./EditorWrapper";

import css from "./style.css";

function JavascriptEditor({ file, write, toggleEditFileMode }) {
  const [value, setValue] = useFileText(file);
  const fileName = getFileName(file);

  const handleSubmit = e => {
    e.preventDefault();
    const saveChanges = confirm(
      "Are you sure you want to save the changes made to the file?"
    );

    if (saveChanges) {
      const newFile = new File([value], `/${fileName}`, { type: file.type });
      write(newFile);
    }
  };

  const handleDiscard = () => {
    const discardChanges = confirm(
      "Are you sure you want to discard the changes?"
    );
    if (discardChanges) {
      toggleEditFileMode();
    }
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <div className={css.editor}>
        <i>{fileName}</i>
        <EditorWrapper>
          {/*Added react-simple-code-editor to add syntax highlighting for editing*/}
          {/*Javascript/json files.*/}
          <Editor
            value={value}
            onValueChange={code => setValue(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontSize: 15
            }}
          />
        </EditorWrapper>
      </div>
      <Button>Save File</Button>
      <RedButton onClick={handleDiscard}>Discard Changes</RedButton>
    </form>
  );
}

JavascriptEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func,
  toggleEditFileMode: PropTypes.func
};

export default JavascriptEditor;
