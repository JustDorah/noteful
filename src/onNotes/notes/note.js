import React, { Component } from "react";
import NotefulContext from "../../context/NotefulContext";
import { Link } from "react-router-dom";
import { dateModified } from "../../utils/helper-functions";

import "./note.css";

class Note extends Component {
  static defaultProps = {
    ApiFolder: [],
    ApiNotes: [],
    selectedFolder: "",
    deleteNote: () => {},
    onDelete: () => {}
  };
  //reason for this?
  static contextType = NotefulContext;

  formatDate = () => {
    //console.log("date in note.js ", this.props.modified);
    let notes = this.props.modified;
    return dateModified(notes);
  };

  onDelete = () => {
    console.log("stuff");
    console.log(this.props.match.params.noteId);
  };
  render() {
    return (
      <div className="nSummary">
        <div className="eachNote" key={this.props.id} id={this.props.id}>
          {this.props.displayDetails ? (
            <h2>{this.props.name}</h2>
          ) : (
            <h2>
              <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
            </h2>
          )}
          <p>Date modified on {this.formatDate(this.props.modified)}</p>
          {/* Delete Button */}
          <button
            className="removeNoteButton"
            key={this.props.id}
            onClick={this.onDelete}
          >
            Delete Note
          </button>
        </div>
        {this.props.displayDetails ? (
          <div className="nDetail">
            <p>{this.props.content}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Note;
