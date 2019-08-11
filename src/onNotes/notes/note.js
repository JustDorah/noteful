import React from "react";
import { Link } from "react-router-dom";

export default function Note(props) {
  return (
    <div className="eachNote" key={props.id} id={props.id}>
      <h2>
        <Link to={`/note/${props.id}`}>{props.nName}</Link>
      </h2>
      <p>Date modified on {props.date}</p>
      <button
        className="removeNoteButton"
        key={props.id}
        onClick={e => {
          this.onDelete(props.id);
        }}
      >
        Delete Note
      </button>
    </div>
  );
}
