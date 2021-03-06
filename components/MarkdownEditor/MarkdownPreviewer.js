import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { useFileText } from "../../hooks";

function MarkdownPreviewer({ file }) {
  const [value] = useFileText(file);
  {
    /*Using ReactMarkdown package to parse markdown text*/
  }
  return <ReactMarkdown source={value} />;
}

export default MarkdownPreviewer;

MarkdownPreviewer.propTypes = {
  file: PropTypes.object
};
