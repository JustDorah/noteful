import React, { Component } from "react";
import NotefulContext from "../../context/NotefulContext";
import { Link, withRouter } from "react-router-dom";
import "../../utils/helper-functions";

import Note from "./note";

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
    if (this.props.match.path === "/") {
      return this.context.ApiNotes;
    } else if (this.props.match.path === "/folder/:folderId") {
      return this.context.ApiFolder.filter(
        notes => notes.folderId === this.props.match.params.folderId
      );
    } else {
      return this.context.ApiNotes;
    }
  };
  render() {
    const { ApiNotes } = this.context;
    console.log(ApiNotes);
    console.log(this.props);

    return (
      <NotefulContext.Consumer>
        {context => (
          <div className="noteList">
            {this.homeNotesFolderNotes().map(n => {
              const modified = n.modified;
              const moment = require("moment");
              let d1 = moment(modified);
              let date = d1.format("Do MMM YYYY");
              return <Note date={date} id={n.id} nName={n.name} />;
            })}
          </div>
        )}
      </NotefulContext.Consumer>
    );
  }
}

export default withRouter(NoteList);
