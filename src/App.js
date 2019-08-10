import React, { Component } from "react";
import { Route } from "react-router-dom";
import NotefulContext from "./NotefulContext";
import MainPage from "./mainPage";
import config from "./config";
import Folder from "./folder";
import Note from "./note";

import "./App.css";
import AddFolder from "./Folder/addFolder";
import AddNote from "./Note/addNote";

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

  setSelectedFolder = id => {
    this.setState({
      selectedFolder: id
    });
  };

  /**Store fetch response for folders and notes */

  setFolder = ApiFolder => {
    this.setState({
      ApiFolder,
      error: null
    });
    //console.log(ApiFolder, "APP ApiFolder");
  };

  setNote = ApiNotes => {
    this.setState({
      ApiNotes,
      error: null
    });
    //console.log(ApiNotes, "APP ApiNotes");
  };

  /**Implement delete button */
  deleteNote = noteId => {
    console.log("noteID in App", noteId);
    const newNotes = this.state.ApiNotes.filter(n => n.id !== noteId);
    this.setState({ ApiNotes: newNotes });
    console.log(newNotes, "noteID");
  };

  //New folder
  addFolder = ApiFolder => {
    this.setState({
      ApiFolder: [...this.state.ApiFolder, ApiFolder]
    });
  };

  //New Note
  AddNote = ApiNotes => {
    console.log("apiNotes addNote gotten");
    this.setState({
      ApiNotes: [...this.state.ApiNotes, ApiNotes]
    });
  };

  /**Get/Fetch folders and notes */
  componentDidMount() {
    //Get FOLDER data
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

    //get NOTE data
    fetch(config.API_NOTES, {
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
      .then(this.setNote)
      .catch(error => this.setState({ error }));
  }

  render() {
    //console.log(this.state.selectedFolder);
    //map out the folders

    const contextValue = {
      ApiData: this.state.ApiData,
      ApiFolder: this.state.ApiFolder,
      ApiNotes: this.state.ApiNotes,
      selectedFolder: this.state.selectedFolder,
      setSelectedFolder: this.setSelectedFolder,
      deleteNote: this.deleteNote,
      onDelete: this.onDelete,
      addFolder: this.addFolder
    };

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <Route exact path="/" component={MainPage} />
          <Route path={`/folder/:folderId`} component={Folder} />
          <Route path={`/note/:noteId`} component={Note} />
          <Route path={`/addFolder`} component={AddFolder} />
          <Route path={`/addNote`} component={AddNote} />
        </div>
      </NotefulContext.Provider>
    );
  }
}
