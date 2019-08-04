import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "./NotefulContext";
import config from "./config";
import "./folderList.css";
import "./note.css";

/**function to delete a note */
function deleteNoteRequest(noteId, callback) {
  console.log(noteId);

  fetch(config.API_NOTES + `/${noteId}`, {
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
      console.log({ data });
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(noteId);
    })
    .catch(error => {
      console.error(error);
    });
}
class Note extends Component {
  //reason for this again?
  static defaultProps = {
    ApiFolder: [],
    ApiNotes: [],
    selectedFolder: "",
    deleteNote: () => {}
  };

  //reason for this?
  static contextType = NotefulContext;

  //in app back button
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { ApiFolder, ApiNotes } = this.context;
    //console.log("mainPage ApiNotes: ", ApiNotes);
    //console.log("mainPage ApiFolder: ", ApiFolder);

    /**IT RENDERS 3TIMES why? */
    //console.log(this.props, "in note.js");

    let noteId = this.props.match.params.noteId;
    //console.log("noteId: ", noteId);

    //get & display the note
    //*********************** */
    //CONSOLE WARNING... each child should have a unique 'key' prop...how to fix?
    //*********** */
    let theNote = ApiNotes.filter(note => note.id === noteId);
    //console.log("theNote: ", theNote);
    /*
    const displayTheNote = theNote.map(note => {
      const modified = note.modified;
      const moment = require("moment");
      let d1 = moment(modified);
      let date = d1.format("Do MMM YYYY");
      //console.log(date);

      return (
        <div>
          <div className="eachNote" key={note.id}>
            <h2>
              <Link to={`/note/${note.id}`}>{note.name}</Link>
            </h2>
            <p>Date modified on {date}</p>
            <p />
            {/* <div className="removeNoteButton" key={note.id}>
              Delete Note
            </div> *}
            <button
              className="removeNoteButton"
              key={note.id}
              onClick={() => deleteNoteRequest(props.id, context.delete)}
            >
              Delete Note
            </button>
          </div>
          <div className={note.name} key={note.id}>
            {note.content}
          </div>
        </div>
      );
    });
*/
    //get and display theNote's folder
    const displayNoteFolder = theNote.map(note => {
      let folder = [];
      folder = ApiFolder.filter(folder => folder.id === note.folderId);
      //console.log("theNoteFolder: ", folder[0]);
      //console.log(this.props.history);
      return (
        <div className="List">
          <button className="backButton" onClick={this.goBack}>
            Go back
          </button>

          <div
            className="eachFolder"
            key={folder[0].id}
            data-div_id={folder[0].id}
            onClick={this.onClickColorHighlight}
          >
            <Link to={`/folder/${folder[0].id}`}>{folder[0].name}</Link>
          </div>
        </div>
      );
    });

    //seeing how to reach/get the go back function
    //let goBack = this.props.history.goBack;
    //console.log("goBack: ", goBack);

    return (
      <NotefulContext.Consumer>
        {context => (
          <div>
            <header className="mainHeader">
              <h1>
                <Link to="/">Noteful</Link>
              </h1>
            </header>

            <nav className="sidebar">{displayNoteFolder}</nav>

            <main className="main">
              {theNote.map(note => {
                const modified = note.modified;
                const moment = require("moment");
                let d1 = moment(modified);
                let date = d1.format("Do MMM YYYY");
                //console.log(date);

                return (
                  <div>
                    <div className="eachNote" key={note.id}>
                      <h2>
                        <Link to={`/note/${note.id}`}>{note.name}</Link>
                      </h2>
                      <p>Date modified on {date}</p>
                      <p />
                      {/* <div className="removeNoteButton" key={note.id}>
              Delete Note
            </div> */}
                      <button
                        className="removeNoteButton"
                        key={note.id}
                        onClick={() =>
                          deleteNoteRequest(note.id, this.context.deleteNote)
                        }
                      >
                        Delete Note
                      </button>
                    </div>
                    <div className={note.name} key={note.id}>
                      {note.content}
                    </div>
                  </div>
                );
              })}
            </main>
          </div>
        )}
      </NotefulContext.Consumer>
    );
  }
}

export default Note;
