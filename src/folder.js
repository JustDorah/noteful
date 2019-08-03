import React, { Component } from "react";
import { Link } from "react-router-dom";
//import FolderList from "./folderList";
import NotefulContext from "./NotefulContext";
import "./folder.css";
import MainPage from "./mainPage";

export default class Folder extends Component {
  //reason for this again?
  static defaultProps = {
    ApiFolder: [],
    ApiNotes: [],
    selectedFolder: ""
  };

  //reason for this?
  static contextType = NotefulContext;
  render() {
    const { ApiNotes } = this.context;
    //console.log("mainPage ApiNotes: ", ApiNotes);
    //console.log("mainPage ApiFolder: ", ApiFolder);

    console.log(this.props, "the props in folder.js");

    //use props to get the folderId and then use to filter notes.
    let folderId = this.props.match.params.folderId;
    console.log(folderId, "the folder Id (folderJs)");

    let folderNotes = ApiNotes.filter(notes => notes.folderId === folderId);
    console.log("folderNotes folderJs", folderNotes);

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
          <div className="nButton">Add note</div>
        </main>
      </div>
    );
  }
}
