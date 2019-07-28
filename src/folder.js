import React, { Component } from "react";
import { Link } from "react-router-dom";
import FolderList from "./folderList";
import "./folder.css";

export default class Folder extends Component {
  static defaultProps = {
    onAddFolder: () => {}
  };

  render() {
    //console.log(this.props, "the props");

    //use routerProps to get the folderId and then use to filter notes.
    let folderId = this.props.routerProps.match.params.folderId;
    //console.log(folderId, "the folder Id");

    let dummyNotes = this.props.dummyNotes;
    //console.log(dummyNotes);

    let folderNotes = dummyNotes.filter(notes => notes.folderId === folderId);
    //console.log(folderNotes);

    //mapping out folderNotes
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
          <FolderList mainFolders={this.props.mainFolders} />
        </nav>

        <main className="main">
          {displayFoldersNotes}
          <div className="nButton">Add note</div>
        </main>
      </div>
    );
  }
}
