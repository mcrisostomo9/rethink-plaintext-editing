import React, { useEffect } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "../components/Button";
import { useFiles, useFileText } from "../hooks";

import { listFiles } from "../lib/list-files";

// Used below, these need to be registered
import MarkdownEditor from "../components/MarkdownEditor";
import PlaintextEditor from "../components/PlaintextEditor";
import JavascriptEditor from "../components/JavascriptEditor";
import MarkdownPreviewer from "../components/MarkdownEditor/MarkdownPreviewer";

import IconPlaintextSVG from "../public/icon-plaintext.svg";
import IconMarkdownSVG from "../public/icon-markdown.svg";
import IconJavaScriptSVG from "../public/icon-javascript.svg";
import IconJSONSVG from "../public/icon-json.svg";
import { getFileName } from "../utils/utils";

import css from "./style.module.css";

const TYPE_TO_ICON = {
  "text/plain": IconPlaintextSVG,
  "text/markdown": IconMarkdownSVG,
  "text/javascript": IconJavaScriptSVG,
  "application/json": IconJSONSVG
};

function FilesTable({ files, activeFile, setActiveFile }) {
  const handleClickFile = file => {
    if (activeFile) {
      setActiveFile({ type: "SWITCH_ACTIVE_FILE", activeFile: file });
    } else {
      setActiveFile({ type: "SET_ACTIVE_FILE", activeFile: file });
    }
  };

  return (
    <div className={css.files}>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ""
              )}
              onClick={() => handleClickFile(file)}
            >
              <td className={css.file}>
                <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type]
                  }}
                />
                {getFileName(file)}
              </td>

              <td>
                {new Date(file.lastModified).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func
};

function Previewer({ file, toggleEditFileMode }) {
  const [value] = useFileText(file);

  const renderPreview = () => {
    if (file.type === "text/markdown") {
      return <MarkdownPreviewer file={file} />;
    } else {
      return value;
    }
  };
  return (
    <div className={css.previewContainer}>
      <div className={css.preview}>
        <div className={css.title}> {getFileName(file)}</div>
        <div className={css.content}>{renderPreview()}</div>
      </div>
      <Button className={css.previewButton} onClick={toggleEditFileMode}>
        Edit File
      </Button>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object,
  toggleEditFileMode: PropTypes.func
};

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
  "text/plain": PlaintextEditor,
  "text/markdown": MarkdownEditor,
  "text/javascript": JavascriptEditor,
  "application/json": JavascriptEditor
};

function PlaintextFilesChallenge() {
  const [state, dispatch] = useFiles();

  useEffect(() => {
    const files = listFiles();
    dispatch({ type: "SET_FILES", files });
  }, []);

  const write = file => {
    const fileIndex = state.files.findIndex(f => f.name === file.name);
    dispatch({ type: "WRITE_FILE", fileIndex, newFile: file });
  };

  const toggleEditFileMode = () =>
    dispatch({ type: "SET_EDIT_FILE", editFile: !state.editFile });

  const Editor = state.activeFile
    ? REGISTERED_EDITORS[state.activeFile.type]
    : null;

  return (
    <div className={css.page}>
      <Head>
        <title>Rethink Engineering Challenge</title>
      </Head>
      <aside>
        <header>
          <div className={css.tagline}>Rethink Engineering Challenge</div>
          <h1>Seasoning Plaintext</h1>
          <div className={css.description}>
            Let{"'"}s have fun with files and JavaScript. What could be more fun
            than rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={state.files}
          activeFile={state.activeFile}
          setActiveFile={dispatch}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://rethink.software">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email us at jobs@rethink.software
          </div>
        </footer>
      </aside>

      <main className={css.editorWindow}>
        {state.activeFile && (
          <>
            {state.editFile && (
              <Editor
                file={state.activeFile}
                write={write}
                toggleEditFileMode={toggleEditFileMode}
              />
            )}
            {!state.editFile && (
              <Previewer
                file={state.activeFile}
                toggleEditFileMode={toggleEditFileMode}
              />
            )}
          </>
        )}

        {!state.activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  );
}

export default PlaintextFilesChallenge;
