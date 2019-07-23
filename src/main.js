import React, { Component } from "react";
import "./main.css";
import NoteList from "./noteList";

export default class MainPage extends Component {
  render() {
    //const notes = this.props.notes;
    // console.log(notes, "the notes");
    return (
      <div>
        <div className="sidebar">
          <a href="#folder1"> Folder</a>
          <a href="#folder2"> Folder1</a>
          <a href="#folder3"> Folder2</a>
        </div>
        <div className="main">
          <header>
            <h1>Noteful:main</h1>
          </header>
          <main>
            <NoteList mainNotes={this.props.mainNotes} />
          </main>
        </div>
      </div>
    );
  }
}
