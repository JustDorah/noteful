import React, { Component } from "react";
//import { Link } from "react-router-dom";
//import NotefulContext from "./context/NotefulContext";

import Header from "./header/header";
import FolderList from "./onFolders/folders/folderList";
import NoteList from "./onNotes/notes/noteList";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        HOME
        <header className="header">
          <Header />
        </header>
        <nav className="sidebar">
          <FolderList />
        </nav>
        <main className="main">
          <NoteList />
        </main>
      </div>
    );
  }
}
