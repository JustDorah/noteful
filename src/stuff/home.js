import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import NotefulContext from "../context/NotefulContext";

import Header from "../header/header";
import FolderList from "../onFolders/folders/folderList";
import NoteList from "../onNotes/notes/noteList";
import Note from "../onNotes/notes/note";

import "./home.css";

class Home extends Component {
  static defaultProps = {
    ApiNotes: [],
    ApiFolder: []
  };
  static contextType = NotefulContext;

  render() {
    return (
      <NotefulContext.Consumer>
        {context => (
          <div className="Home">
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
        )}
      </NotefulContext.Consumer>
    );
  }
}
export default withRouter(Home);
