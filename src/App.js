import React, { Component } from "react";
//import { Route, Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import NotefulContext from "./NotefulContext";
//import NOTES from "./noteStore";
import MainPage from "./mainPage";
//import NoteList from "./noteList";
import config from "./config";

import "./App.css";
//import Folder from "./folder";
//import Note from "./note";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ApiData: [],
      ApiFolder: [],
      ApiNotes: [],
      selectedFolder: "",
      error: null
    };
  }

  onClickColorHighlight = e => {
    let clickedFolder = e.currentTarget.dataset.div_id;
    this.setState({
      selectedFolder: clickedFolder
    });
  };
  /**Store fetch response for folders and notes */

  setFolder = ApiFolder => {
    this.setState({
      ApiFolder,
      error: null
    });
    console.log(ApiFolder, "APP ApiFolder");
  };

  setNote = ApiNotes => {
    this.setState({
      ApiNotes,
      error: null
    });
    console.log(ApiNotes, "APP ApiNotes");
  };

  /**Get/Fetch folders and notes */
  componentDidMount() {
    //Get folder data
    fetch(config.API_FOLDERS, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setFolder)
      .catch(error => this.setState({ error }));

    //get note data
    fetch(config.API_NOTES, {
      method: "GET",
      headers: {
        "content-type": "application/json"
        // Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setNote)
      .catch(error => this.setState({ error }));
  }

  render() {
    //get & show notes data

    //get & show folder data

    //map out the notes

    //map out the folders

    const contextValue = {
      ApiData: this.state.ApiData,
      ApiFolder: this.state.ApiFolder,
      ApiNotes: this.state.ApiNotes,
      selectedFolder: this.state.selectedFolder
    };

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <Route
            exact
            path="/"
            // render={() => (
            //   <MainPage mainNotes={mainNotes} mainFolders={mainFolders} />
            // )}
            component={MainPage}
          />
          {/* <Route
            path={`/folder/:folderId`}
            render={routerProps => (
              <Folder
                routerProps={routerProps}
                mainNotes={mainNotes}
                mainFolders={mainFolders}
                dummyNotes={dummyNotes}
              />
            )} 
            component={Folder}
          />*/}
          {/* <Route
            path={`/note/:noteId`}
            render={routerProps => (
              <Note
                routerProps={routerProps}
                mainNotes={mainNotes}
                dummyFolders={dummyFolders}
                dummyNotes={dummyNotes}
              />
            )}
            component={Note}
          /> */}
        </div>
      </NotefulContext.Provider>
    );
  }
}
