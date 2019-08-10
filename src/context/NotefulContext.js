import React from "react";

const NotefulContext = React.createContext({
  ApiData: [],
  ApiFolder: [],
  ApiNotes: [],
  selectedFolder: null,
  setSelectedFolder: () => {},
  deleteNoteRequest: () => {},
  deleteNote: () => {},
  onDelete: () => {},
  addFolder: () => {},
  addNote: () => {}
});

export default NotefulContext;