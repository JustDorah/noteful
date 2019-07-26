import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import NOTES from "./noteStore";
import MainPage from "./main";
import NoteList from "./noteList";

import "./App.css";
import Folder from "./folder";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dummyData: NOTES
    };
  }

  state = {
    addedNotes: [],
    addedFolders: []
  };
  handleFolderClick = e => {
    // e.preventDefault();
    console.log("hi, this was clicked", e.currentTarget.dataset.div_id);
  };

  render() {
    //get & show notes data
    const dummyNotes = this.state.dummyData.notes;
    console.log(dummyNotes);

    //get & show folder data
    const dummyFolders = this.state.dummyData.folders;
    console.log(dummyFolders);

    //map notes
    const mainNotes = dummyNotes.map(note => {
      const modified = note.modified;
      const moment = require("moment");
      let d1 = moment(modified);
      let date = d1.format("Do MMM YYYY");
      //console.log(date);
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

    //map folders
    //onClick solution from https://ozmoroz.com/2018/07/pass-value-to-onclick-react/
    const mainFolders = dummyFolders.map(folder => {
      return (
        <div
          className="eachFolder"
          key={folder.id}
          data-div_id={folder.id}
          onClick={this.handleFolderClick}
        >
          <Link to={`/folder/${folder.id}`}>{folder.name}</Link>{" "}
        </div>
      );
    });

    /** dummy folder and dummy notes */
    const folderNotes = dummyFolders.map(fN => {
      let sameId = dummyNotes.filter(notes => notes.folderId === fN.id);
      return [fN.id, sameId];
    });
    console.log(folderNotes);

    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage
              mainNotes={mainNotes}
              mainFolders={mainFolders}
              folderNotes={folderNotes}
            />
          )}
        />
        <Route
          path={`/folder/:folderId`}
          render={() => (
            <Folder
              mainNotes={mainNotes}
              mainFolders={mainFolders}
              folderNotes={folderNotes}
            />
          )}
          //component={Folder}
        />
      </div>
    );
  }
}
