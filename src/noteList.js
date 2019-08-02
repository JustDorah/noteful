import React from "react";
import NotefulContext from "./NotefulContext";

import "./noteList.css";

export default function NoteList(props) {
  //const notes = props.notes;
  //console.log(notes, "the notes");
  return (
    <NotefulContext.Consumer>
      {context => (
        <div>
          <div className="List">{props.mainNotes}</div>

          <div className="nButton">Add note</div>
        </div>
      )}
    </NotefulContext.Consumer>
  );
}
