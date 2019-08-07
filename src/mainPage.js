import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import NoteList from "./noteList";
import NotefulContext from "./NotefulContext";
import AddFolder from "./Folder/addFolder";

export default class MainPage extends Component {
  //reason for this again?
  static defaultProps = {
    ApiFolder: [],
    ApiNotes: [],
    selectedFolder: "eachFolder",
    setSelectedFolder: () => {},
    addFolder: () => {}
  };

  //reason for this?
  static contextType = NotefulContext;
  handleAddFolderButton = () => {
    //console.log(this.props.history.push("/addFolder"));
    this.props.history.push("/addFolder");
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
          <div className="removeNoteButton" key={note.id}>
            Delete Note
          </div>
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
                AddFolder
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
