import React from "react";

const NotefulContext = React.createContext({
  ApiData: [],
  ApiFolder: [],
  ApiNotes: [],
  selectedFolder: null,
  setSelectedFolder: () => {},
  deleteNote: () => {},
  onDelete: () => {}
});

export default NotefulContext;
