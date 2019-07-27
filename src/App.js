import React, { Component } from "react";
//import { Route, Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import NOTES from "./noteStore";
import MainPage from "./main";
//import NoteList from "./noteList";

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

  render() {
    //get & show notes data
    const dummyNotes = this.state.dummyData.notes;
    //console.log(dummyNotes);

    //get & show folder data
    const dummyFolders = this.state.dummyData.folders;
    //console.log(dummyFolders);

    //map notes
    const mainNotes = dummyNotes.map(note => {
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

    //map folders
    const mainFolders = dummyFolders.map(folder => {
      return (
        <div className="eachFolder" key={folder.id} data-div_id={folder.id}>
          <Link to={`/folder/${folder.id}`}>{folder.name}</Link>{" "}
        </div>
      );
    });

    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage mainNotes={mainNotes} mainFolders={mainFolders} />
          )}
        />
        <Route
          path={`/folder/:folderId`}
          render={routerProps => (
            <Folder
              routerProps={routerProps}
              mainNotes={mainNotes}
              mainFolders={mainFolders}
              dummyNotes={dummyNotes}
            />
          )}
        />
      </div>
    );
  }
}
