import React, { Component } from "react";
import NotefulContext from "../../context/NotefulContext";
import config from "../../store/config";
import { Link, withRouter } from "react-router-dom";
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

  static contextType = NotefulContext;

  // ***A REQUEST to delete a note****
  deleteNoteRequest(noteId, callback) {
    //console.log(noteId);

    return fetch(config.API_NOTES + `/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        console.log("res.json response data ", { data });
        console.log("Callback...", callback);
        // call the callback(deleteNote()) when the request is successful
        // this is where the App component can remove it from state aka setState
        callback(noteId);
        //console.log("callback: ", callback);
      })
      .catch(error => {
        console.error(error);
      });
  }

  /***RETURN HOME after delete. 
  -I could also go back a page
  -I need withRouter in order to access history */
  returnHome = () => {
    console.log("Going HOOoommme!! :)", this.props);

    this.props.history.push("/");
  };

  onDelete = e => {
    e.preventDefault();
    console.log("Delete Note initiated");

    // console.log("noteID: ", this.props.id);
    // console.log("noteID: ", this.context.deleteNote);
    const noteID = this.props.id;

    this.deleteNoteRequest(noteID, this.context.deleteNote);

    this.returnHome();
  };

  formatDate = () => {
    //console.log("date in note.js ", this.props.modified);
    let notes = this.props.modified;
    return dateModified(notes);
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
            onClick={e => this.onDelete(e)}
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
export default withRouter(Note);
