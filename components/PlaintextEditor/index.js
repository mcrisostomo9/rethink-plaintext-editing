import React from "react";
import PropTypes from "prop-types";
import { useFileText } from "../../hooks";
import { getFileName } from "../../utils/utils";
import { Button, RedButton } from "../Button";
import { Textarea } from "../Textarea";
import css from "./style.css";

function PlaintextEditor({ file, write, toggleEditFileMode }) {
  const [value, setValue] = useFileText(file);
  const fileName = getFileName(file);

  const handleChange = e => {
    setValue(e.target.value);
  };

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
        <Textarea
          name="fileText"
          value={value}
          onChange={handleChange}
          cols="30"
          rows="10"
        >
          {value}
        </Textarea>
      </div>
      <Button>Save File</Button>
      <RedButton onClick={handleDiscard}>Discard Changes</RedButton>
    </form>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func,
  toggleEditFileMode: PropTypes.func
};

export default PlaintextEditor;
