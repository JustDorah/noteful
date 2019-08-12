import React, { Component } from "react";
import NotefulContext from "../../context/NotefulContext";

import Note from "./note";

export default class NoteDetails extends Component {
  static defaultProps = {
    ApiNotes: []
  };
  static contextType = NotefulContext;

  render() {
    console.log(this.props);
    //get noteID info
    let noteId = this.props.match.params.noteId;
    console.log("noteId Display: ", noteId);

    let notes = this.context.ApiNotes.find(note => note.id === noteId);
    console.log(this.notes, "display");

    return (
      <div className="main details">
        <Note {...notes} displayDetails={true} />
      </div>
    );
  }
}
