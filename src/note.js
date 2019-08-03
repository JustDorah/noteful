import React, { Component } from "react";
import { Link } from "react-router-dom";
//import NoteList from "./noteList";
import "./folderList.css";
import "./note.css";
import NotefulContext from "./NotefulContext";

class Note extends Component {
  //reason for this again?
  static defaultProps = {
    ApiFolder: [],
    ApiNotes: [],
    selectedFolder: ""
  };

  //reason for this?
  static contextType = NotefulContext;

  //in app back button
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { ApiFolder, ApiNotes, selectedFolder } = this.context;
    //console.log("mainPage ApiNotes: ", ApiNotes);
    //console.log("mainPage ApiFolder: ", ApiFolder);

    console.log(this.props, "noteId");

    let noteId = this.props.match.params.noteId;
    console.log("noteId: ", noteId);

    //get & display the note
    //*********************** */
    //CONSOLE WARNING... each child should have a unique 'key' prop...how to fix?
    //*********** */
    let theNote = ApiNotes.filter(note => note.id === noteId);
    console.log("theNote: ", theNote);

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

    //get and display theNote's folder
    //let theNoteFolder = dummyFolders.filter(folder => folder.id === folderId);
    //console.log("theNoteFolder: ", theNoteFolder);
    const displayNoteFolder = theNote.map(note => {
      let folder = [];
      folder = ApiFolder.filter(folder => folder.id === note.folderId);
      //console.log("theNoteFolder: ", folder[0]);
      console.log(this.props.history);
      return (
        <div className="List">
          <button className="backButton" onClick={this.goBack}>
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

    let goBack = this.props.history.goBack;
    console.log("goBack: ", goBack);

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

export default Note;
