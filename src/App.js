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
    const dummyNotes = this.state.dummyData.notes;
    console.log(dummyNotes);
    //console.log(this.state.dummyData, "dummyData");

    const mainNotes = dummyNotes.map(note => {
      const modified = note.modified;
      const moment = require("moment");
      let d1 = moment(modified);
      let date = d1.format("L");
      //console.log(date);
      return (
        <div className="eachNote" key={note.id}>
          <h2>{note.name}</h2>
          <p>Modified: {date}</p>
          <p />
        </div>
      );
    });
    console.log(new Intl.DateTimeFormat("en-US").format(dummyNotes.modified));
    return (
      <div className="App">
        <MainPage mainNotes={mainNotes} />
      </div>
    );
  }
}
