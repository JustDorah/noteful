import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import config from "./store/config";
import NotefulContext from "./context/NotefulContext";

import Home from "./home";
//import Header from "./header/header";
//import FolderList from "./onFolders/folders/folderList";
import Folder from "./onFolders/folders/folder";
import AddFolder from "./onFolders/addFolder/addFolder";
//import NoteList from "./onNotes/notes/noteList";
import Note from "./onNotes/notes/note";
import NoteList from "./onNotes/notes/noteList";
import AddNote from "./onNotes/addNote/addNote";

//import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // stuff here
      ApiData: [],
      ApiFolder: []
    };
  }

  /**GET/ FETCH folders and notes */
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
      .catch(error => {
        console.log("error in fetch folder app.js ", error);
        this.setState({ error });
      });

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
      .catch(error => {
        console.log("error in fetch note app.js ", error);
        this.setState({ error });
      });
  }

  /**SET the STATE aka render UI with collected folder nad note data */

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
  render() {
    const contextValue = {
      ApiFolder: this.state.ApiFolder,
      ApiNotes: this.state.ApiNotes
    };
    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path={`/folder/:folderId`} component={Folder} />
          <Route path="/folder/:folderId" component={NoteList} />
          <Route path={`/addFolder`} component={AddFolder} />
          <Route path={`/note/:noteId`} component={Note} />
          <Route path={`/addNote`} component={AddNote} />
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default withRouter(App);
