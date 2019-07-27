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
      dummyData: NOTES,
      addedNotes: [],
      addedFolders: [],
      color: "",
      selected: null
    };
  }

  onClickColorHighlight = e => {
    // e.preventDefault();
    //console.log("hi, this was clicked", e.currentTarget.dataset.div_id);
    let clickedFolder = e.currentTarget.dataset.div_id;
    this.setState({ selected: clickedFolder });

    console.log(clickedFolder, "the folder that has been clicked");
    // this.state.selected;
    console.log("this.state.selected: ", this.state.selected);
    // e.currentTarget.dataset.class = "yellowHighlight";
  };

  render() {
    //classname

    //console.log("this.props.theselected: ", this.props.theselected);
    //console.log("className: ", className);

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
      let className = this.props.theselected
        ? "eachFolder selected"
        : "eachFolder";
      console.log("this.props.theselected: ", this.props.theselected);
      console.log("className: ", className);
      console.log(this.state.selected, "in masdfasdf");

      console.log(folder.id, "olderid");

      return (
        <div
          className={className}
          key={folder.id}
          data-div_id={folder.id}
          style={{ backgroundColor: this.state.color }}
          onClick={this.onClickColorHighlight}
          theselected={this.state.selected === folder.id}
        >
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
