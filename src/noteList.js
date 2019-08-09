import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NotefulContext from "./NotefulContext";

import "./noteList.css";

class NoteList extends Component {
  static defaultProps = {
    addNote: () => {}
  };
  handleAddNoteButton = () => {
    this.props.history.push("/addNote");
    console.log("this.props.history.push: ", this.props.history);
  };
  render() {
    //const notes = props.notes;
    //console.log(notes, "the notes");
    //console.log(this.props);
    return (
      <NotefulContext.Consumer>
        {context => (
          <div>
            <div className="List">{this.props.mainNotes}</div>

            <button className="nButton" onClick={this.handleAddNoteButton}>
              Add note
            </button>
          </div>
        )}
      </NotefulContext.Consumer>
    );
  }
}
export default withRouter(NoteList);
