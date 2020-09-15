import { useReducer } from "react";

const initialState = {
  files: [],
  activeFile: null,
  editFile: false
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FILES":
      return { ...state, files: action.files };
    case "SET_ACTIVE_FILE":
      // Set active file if there is no current active file
      return { ...state, activeFile: action.activeFile };
    case "SWITCH_ACTIVE_FILE":
      // Set active file if there is a current active file
      return { ...state, activeFile: action.activeFile, editFile: false };
    case "SET_EDIT_FILE":
      return { ...state, editFile: action.editFile };
    case "WRITE_FILE": {
      const updatedFiles = [...state.files];
      updatedFiles[action.fileIndex] = action.newFile;
      return {
        ...state,
        activeFile: action.newFile,
        files: updatedFiles,
        editFile: false
      };
    }
    default:
      throw new Error();
  }
}

export const useFiles = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};
