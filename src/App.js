import React, { Component } from "react";
//import { Route, Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import NOTES from "./noteStore";
import MainPage from "./main";
//import NoteList from "./noteList";

import "./App.css";
import Folder from "./folder";
import Note from "./note";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dummyData: NOTES,
      addedNotes: [],
      addedFolders: [],
      selectedFolder: null
    };
  }

  onClickColorHighlight = e => {
    //https://www.codementor.io/packt/using-the-link-and-navlink-components-to-navigate-to-a-route-rieqipp42#the-navlink-component
    //This would have made my live easier in terms of selecting the active folder.

    // e.preventDefault();

    //console.log("hi, this was clicked", e.currentTarget.dataset.div_id);

    //setting selected to the specific folder clicked
    let clickedFolder = e.currentTarget.dataset.div_id;
    this.setState({
      selectedFolder: clickedFolder
    });

    /*
   //shows that I have the correct clickedFolder value
    console.log(clickedFolder, "the folder that has been clicked");

    // this.state.selectedFolder - here is shows the previous value of selected. on line 82 or os it shows the current value of selected. why??
    console.log("this.state.selected: ", this.state.selected);*/
  };

  render() {
    //get & show notes data
    const dummyNotes = this.state.dummyData.notes;
    //console.log(dummyNotes);

    //get & show folder data
    const dummyFolders = this.state.dummyData.folders;
    //console.log(dummyFolders);

    //map out the notes
    const mainNotes = dummyNotes.map(note => {
      //format the date - installed momentjs to accomplish
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

    //map out the folders
    const mainFolders = dummyFolders.map(folder => {
      //class
      let className =
        folder.id === this.state.selectedFolder
          ? "eachFolder selected"
          : "eachFolder";
      /*
      console.log(
        folder.id + " --now has a className property of-- " + className
      );
    
      //initially shows up as null ( at page refresh), but once clicked shows current value of selected.
      console.log(this.state.selected, " : value of this.state.selected");
      */
      return (
        <div
          className={className}
          key={folder.id}
          data-div_id={folder.id}
          onClick={this.onClickColorHighlight}
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
        <Route
          path={`/note/:noteId`}
          render={routerProps => (
            <Note
              routerProps={routerProps}
              mainNotes={mainNotes}
              dummyFolders={dummyFolders}
              dummyNotes={dummyNotes}
            />
          )}
        />
      </div>
    );
  }
}
