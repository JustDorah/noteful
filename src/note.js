import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
//import NoteList from "./noteList";
import "./folderList.css";
import "./note.css";

class Note extends Component {
  render() {
    console.log(this.props.routerProps);

    let dummyNotes = this.props.dummyNotes;

    let dummyFolders = this.props.dummyFolders;

    let goBack = this.props.routerProps.history.goBack;
    console.log("goBack: ", goBack);

    let noteId = this.props.routerProps.match.params.noteId;
    console.log("noteId: ", noteId);

    let theNote = dummyNotes.filter(note => note.id === noteId);
    console.log("theNote: ", theNote);

    //get and display theNote's folder
    //let theNoteFolder = dummyFolders.filter(folder => folder.id === folderId);
    //console.log("theNoteFolder: ", theNoteFolder);

    const displayNoteFolder = theNote.map(note => {
      let folder = [];
      folder = dummyFolders.filter(folder => folder.id === note.folderId);
      //console.log("theNoteFolder: ", folder[0]);
      console.log(this.props.history);
      return (
        <div className="List">
          <button
            className="backButton"
            onClick={() => this.routerProps.props.history.goBack()}
          >
            Go back
          </button>

          <div
            className="eachFolder"
            key={folder[0].id}
            data-div_id={folder[0].id}
            onClick={this.onClickColorHighlight}
          >
            <Link to={`/folder/${folder[0].id}`}>{folder[0].name}</Link>
          </div>
        </div>
      );
    });

    const displayTheNote = theNote.map(note => {
      const modified = note.modified;
      const moment = require("moment");
      let d1 = moment(modified);
      let date = d1.format("Do MMM YYYY");
      //console.log(date);

      return (
        <div>
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
          <div className={note.name} key={note.id}>
            {note.content}
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

        <nav className="sidebar">{displayNoteFolder}</nav>

        <main className="main">{displayTheNote}</main>
      </div>
    );
  }
}

export default withRouter(Note);
