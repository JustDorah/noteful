import React from "react";

const NotefulContext = React.createContext({
  ApiData: [],
  ApiFolder: [],
  ApiNotes: [],
  selectedFolder: null,
  deleteNote: () => {}
});

export default NotefulContext;
