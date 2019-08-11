import React, { Component } from "react";
import NotefulContext from "../../context/NotefulContext";

import Note from "./note";

export default class NoteList extends Component {
  /**Trouble was creating a single show of the note data. Before I'd have to run it multiple times within both the notes and folder components. Solution  I was given: create an if statement to show notes for a particular folder when the folder is clicked, if not, then just show all the notes...
   * used info from previous app version to do this
   * Doesn't work as a const variable like before...
   * 
   *  const homeNotesFolderNotes = this.context.ApiNotes.map(notes => {
      // let folderId = this.props.match.params.folderId; //coming off as a typeError

      if (this.props.match.path === "/folder/:folderId") {
        return this.context.ApiNotes.filter(
          notes => notes.folderId === this.props.match.params.folderId
        );
      } else {
        return this.context.ApiNotes;
      }
      return <Note {...notes} />;
    });
   * solution from Chris...
  
  run homeNotes... as function.. and then route it from folder/:folderId.. so that params is path is read
   */

  static contextType = NotefulContext;
  /*
  homeNotesFolderNotes = () => {
    // let folderId = this.props.match.params.folderId; //coming off as a typeError
    console.log(this.context.ApiNotes, "APiNOres context");
    /*if (this.props.match.path === "/folder/:folderId" || undefined) {
      return this.context.ApiNotes.filter(
        notes => notes.folderId === this.props.match.params.folderId
      );
    } else {
      return this.context.ApiNotes;
    }*
};*/
  render() {
    const { ApiNotes } = this.context;
    console.log(ApiNotes);
    console.log(this.props);
    return (
      <NotefulContext.Consumer>
        {context => (
          <div className="noteList">
            {/* {this.homeNotesFolderNotes().map(notes => (
          <Note {...notes} />
        ))} */}
            {context.ApiNotes.map(notes => {
              if (this.props.match.path === "/folder/:folderId" || undefined) {
                return (
                  <Note
                    {...notes.filter(
                      note => note.folderId === this.props.match.params.folderId
                    )}
                  />
                );
              } else {
                return <Note {...notes} />;
              }
            })}
          </div>
        )}
      </NotefulContext.Consumer>
    );
  }
}
