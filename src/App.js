import React, { Component } from "react";
import { Route } from "react-router-dom";
//import NotefulContext from "./context/NotefulContext";

import Home from "./home";
//import Header from "./header/header";
//import FolderList from "./onFolders/folders/folderList";
import Folder from "./onFolders/folders/folder";
import AddFolder from "./onFolders/addFolder/addFolder";
//import NoteList from "./onNotes/notes/noteList";
import Note from "./onNotes/notes/note";
import AddNote from "./onNotes/addNote/addNote";

//import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      // stuff here
    };
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path={`/folder/:folderId`} component={Folder} />
        <Route path={`/addFolder`} component={AddFolder} />
        <Route path={`/note/:noteId`} component={Note} />

        <Route path={`/addNote`} component={AddNote} />
      </div>
    );
  }
}
