import React from "react";
import "./noteList.css";
export default function NoteList(props) {
  //const notes = props.notes;
  //console.log(notes, "the notes");
  return (
    <div>
      <div className="List">{props.mainNotes}</div>

      <div className="nButton">Add note</div>
    </div>
  );
}
