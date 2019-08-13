import React, { Component } from "react";
import NotefulContext from "../../context/NotefulContext";
//import { Link withRouter } from "react-router-dom";
import "../../utils/helper-functions";

import Note from "./note";
import "./noteList.css";
import { dateModified } from "../../utils/helper-functions";

class NoteList extends Component {
  static defaultProps = {
    ApiNotes: []
  };
  static contextType = NotefulContext;
  /*
  
    // let folderId = this.props.match.params.folderId; //coming off as a typeError
    //console.log(this.context.ApiNotes, "APiNOres context");
if (this.props.match.path === "/folder/:folderId") {
      return this.context.ApiNotes.filter(
        notes => notes.folderId === this.props.match.params.folderId
      );
*/

  homeNotesFolderNotes = () => {
    if (this.props.match.path === "/folder/:folderId") {
      return this.context.ApiNotes.filter(
        notes => notes.folderId === this.props.match.params.folderId
      );
    } else {
      return this.context.ApiNotes;
    }
  };
  render() {
    return (
      <NotefulContext.Consumer>
        {context => (
          <div className="main list">
            {this.homeNotesFolderNotes().map(notes => {
              let date = dateModified(notes);
              //console.log(date);
              return <Note {...notes} nName={notes.name} date={date} />;
            })}
            <button
              className="nButton"
              onClick={() => this.props.history.push("/addNote")}
            >
              Add note
            </button>
          </div>
        )}
      </NotefulContext.Consumer>
    );
  }
}

export default NoteList;
