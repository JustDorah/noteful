import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import NoteList from "./noteList";
import FolderList from "./folderList";

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>

        <nav className="sidebar">
          <FolderList
            mainFolders={this.props.mainFolders}
            folderNotes={this.props.folder}
          />
        </nav>

        <main className="main">
          <NoteList mainNotes={this.props.mainNotes} />
        </main>
      </div>
    );
  }
}
