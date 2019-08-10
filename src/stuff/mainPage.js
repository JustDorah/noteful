import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import NoteList from "./noteList";
import NotefulContext from "./NotefulContext";
import Note from "./note";
import config from "./config";

export default class MainPage extends Component {
  //reason for this again?
  static defaultProps = {
    ApiFolder: [],
    ApiNotes: [],
    selectedFolder: "eachFolder",
    setSelectedFolder: () => {},
    addFolder: () => {},
    deleteNote: () => {},
    onDelete: () => {}
  };

  //reason for this?
  static contextType = NotefulContext;
  handleAddFolderButton = () => {
    //console.log(this.props.history.push("/addFolder"));
    this.props.history.push("/addFolder");
  };

  onDelete = noteId => {
    //console.log("this.props.note.id: ", id);

    this.deleteNoteRequest(noteId, this.context.deleteNote);
    //this.returnHome();
  };

  // returnHome = () => {
  //   console.log("return home!", this.props);
  //   this.props.history.push("/");

  //   //Router.dispatch(location.getCurrentPath(), null);
  // };

  deleteNoteRequest = (noteId, callback) => {
    console.log("delete not request", noteId);

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
        console.log({ data });
        console.log("Callback...", callback);
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        callback(noteId);
        //console.log("callback: ", callback);
        // this.onDelete(noteId);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const {
      ApiFolder,
      ApiNotes,
      selectedFolder,
      setSelectedFolder
    } = this.context;
    //console.log("mainPage ApiNotes: ", ApiNotes);
    //console.log("mainPage ApiFolder: ", ApiFolder);

    //map out the notes
    const mainNotes = ApiNotes.map(note => {
      //format the date
      const modified = note.modified;
      const moment = require("moment");
      let d1 = moment(modified);
      let date = d1.format("Do MMM YYYY");
      //console.log(date, 'the formatted date');

      return (
        <div className="eachNote" key={note.id}>
          <h2>
            <Link to={`/note/${note.id}`}>{note.name}</Link>
          </h2>
          <p>Date modified on {date}</p>
          <p />
          <button
            className="removeNoteButton"
            key={note.id}
            onClick={e => {
              this.onDelete(note.id);
            }}
          >
            Delete Note
          </button>
        </div>
      );
    });

    return (
      <NotefulContext.Consumer>
        {context => (
          <div>
            <header className="mainHeader">
              <h1>
                <Link to="/">Noteful</Link>
              </h1>
            </header>

            <nav className="sidebar">
              {ApiFolder.map(folder => {
                //class
                let className =
                  folder.id === this.context.selectedFolder
                    ? "eachFolder selected"
                    : "eachFolder";

                console.log("selectedFolder: ", selectedFolder);

                return (
                  <div
                    className={className}
                    key={folder.id}
                    data-div_id={folder.id}
                    onClick={e => setSelectedFolder(folder.id)}
                  >
                    <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
                  </div>
                );
              })}
              <button
                className="addFolderBtn"
                onClick={this.handleAddFolderButton}
              >
                Add folder
              </button>
            </nav>

            <main className="main">
              <NoteList mainNotes={mainNotes} />
            </main>
          </div>
        )}
      </NotefulContext.Consumer>
    );
  }
}
