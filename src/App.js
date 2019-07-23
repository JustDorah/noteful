import React, { Component } from "react";
//import { Route } from "react-router-dom";
import NOTES from "./noteStore";
import MainPage from "./main";
//import NoteList from "./noteList";

import "./App.css";

//import NoteList from "./noteList";

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
          <h2>{note.name}</h2>
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
        <p className="eachFolder" key={folder.id}>
          <a href="folder.name" key={folder.id}>
            {folder.name}
          </a>
        </p>
      );
    });

    return (
      <div className="App">
        <MainPage mainNotes={mainNotes} mainFolders={mainFolders} />
      </div>
    );
  }
}
