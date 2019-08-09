import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "./NotefulContext";
import MainPage from "./mainPage";

import "./folder.css";

export default class Folder extends Component {
  static defaultProps = {
    ApiFolder: [],
    ApiNotes: [],
    selectedFolder: "",
    addFolder: () => {}
  };

  static contextType = NotefulContext;
  handleAddNoteButton = () => {
    this.props.history.push("/addNote");
    console.log("this.props.history.push: ", this.props.history);
  };

  render() {
    const { ApiNotes } = this.context;

    //weird....
    //console.log(this.props.history.push("/addFolder"));
    //console.log("mainPage ApiNotes: ", ApiNotes);
    //console.log("mainPage ApiFolder: ", ApiFolder);

    // console.log(this.props, "the props in folder.js");

    //use props to get the folderId and then use to filter notes.
    let folderId = this.props.match.params.folderId;
    //console.log(folderId, "the folder Id (folderJs)");

    let folderNotes = ApiNotes.filter(notes => notes.folderId === folderId);
    // console.log("folderNotes folderJs", folderNotes);

    //mapping out and display folderNotes
    const displayFoldersNotes = folderNotes.map(note => {
      const modified = note.modified;
      const moment = require("moment");
      let d1 = moment(modified);
      let date = d1.format("Do MMM YYYY");
      //console.log(date);
      return (
        <div className="eachNote" key={note.id}>
          <h2>
            <Link to={`/note/${note.id}`}>{note.name}</Link>
          </h2>
          <p>Date modified on {date}</p>
          <p />
          <div className="removeNoteButton" key={note.id}>
            Delete Note
          </div>
        </div>
      );
    });

    return (
      <div>
        <header className="mainHeader">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>

        <nav className="sidebar">
          <MainPage />
        </nav>

        <main className="main">
          {displayFoldersNotes}
          <button className="nButton" onClick={this.handleAddNoteButton}>
            Add note
          </button>
        </main>
      </div>
    );
  }
}
