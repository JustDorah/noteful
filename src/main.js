import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import NoteList from "./noteList";
import FolderList from "./folderList";

export default class MainPage extends Component {
  render() {
    //const notes = this.props.notes;
    // console.log(notes, "the notes");
    return (
      <div>
        <header className="mainHeader">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>

        <nav className="sidebar">
          <FolderList mainFolders={this.props.mainFolders} />
        </nav>

        <main className="main">
          <NoteList mainNotes={this.props.mainNotes} />
        </main>
      </div>
    );
  }
}