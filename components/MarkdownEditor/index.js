import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { Button, RedButton } from "../Button";
import { Textarea } from "../Textarea";
import { useFileText } from "../../hooks";
import { getFileName } from "../../utils/utils";
import css from "./style.css";

const Container = styled("div")`
  display: flex;
`;

const MarkdownSection = styled(`div`)`
  padding: 0 20px;
  flex: 1;
`;

function MarkdownEditor({ file, write, toggleEditFileMode }) {
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
    <div className={css.editor}>
      <i>{fileName}</i>
      <Container>
        <MarkdownSection as="form" onSubmit={handleSubmit}>
          <h3>Markdown editor:</h3>
          <Textarea
            name="markdown"
            value={value}
            onChange={e => setValue(e.target.value)}
            cols="30"
            rows="15"
          />
          <Button>Save File</Button>
          <RedButton onClick={handleDiscard}>Discard Changes</RedButton>
        </MarkdownSection>
        <MarkdownSection>
          <h3>Preview</h3>
          {/*Using ReactMarkdown package to parse markdown text*/}
          <ReactMarkdown source={value} />
        </MarkdownSection>
      </Container>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func,
  toggleEditFileMode: PropTypes.func
};

export default MarkdownEditor;
