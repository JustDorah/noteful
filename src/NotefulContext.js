import React from "react";

const NotefulContext = React.createContext({
  ApiData: [],
  ApiFolder: [],
  ApiNotes: [],
  selectedFolder: null,
  onClickColorHighlight: () => {},
  deleteNote: () => {}
});

export default NotefulContext;
