import React, { Component } from "react";
import NotefulContext from "../../context/NotefulContext";
import Folder from "./Folder";

export default class DisplayFolderDetails extends Component {
  static defaultProps = {
    ApiFolders: [],
    ApiNotes: [],
    notes: {},
    notesFolder: {}
  };

  static contextType = NotefulContext;

  //***** *THE RENDER* *****
  render() {
    // console.log(this.context.ApiFolder);
    //console.log(this.props);

    //Id of note clicked
    let noteId = this.props.match.params.noteId;
    // console.log("noteId: ", noteId);

    //the details of the note clicked
    //empty object to catch a type error of undefined...
    let note = this.context.ApiNotes.find(note => note.id === noteId) || {};
    // console.log("notes: ", note);

    //the folder that holds the note clicked
    //empty object to catch a type error of undefined...
    let notesFolder =
      this.context.ApiFolder.find(folder => folder.id === note.folderId) || {};
    // console.log("notesFolder: ", notesFolder);

    //***** *THE RETURN* *****
    return (
      <nav className="sidebar detail">
        <Folder id={notesFolder.id} fName={notesFolder.name} />
        <br />
        <button
          className="sidebarBtn back"
          onClick={() => this.props.history.push("/")}
        >
          Go back
        </button>
      </nav>
    );
  }
}
