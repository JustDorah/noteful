import React, { Component } from "react";
import { Route } from "react-router-dom";
import config from "./store/config";
import NotefulContext from "./context/NotefulContext";

import Header from "./header/header";

import FolderList from "./onFolders/Folders/FolderList";
import DisplayFolderDetails from "./onFolders/Folders/DisplayFolderDetails";

import NoteList from "./onNotes/notes/noteList";
import "./App.css";
import DisplayNoteDetails from "./onNotes/notes/DisplayNoteDetails";

import NewFolder from "./onFolders/AddFolders/NewFolder";
import AddNote from "./onNotes/AddNote/AddNote";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // stuff here
      ApiNotes: [],
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

  /**Set State of deleted Note */
  deleteNote = noteId => {
    console.log("noteID in App", noteId);
    const newNotes = this.state.ApiNotes.filter(n => n.id !== noteId);
    this.setState({ ApiNotes: newNotes });
    console.log(newNotes, "noteID");
  };

  /** Set state of newly created folder */
  addFolder = folder => {
    let addedFolder = [...this.state.ApiFolder, folder];
    this.setState({
      ApiFolder: addedFolder
    });
  };
  /** Set state of newly created note */

  render() {
    const contextValue = {
      ApiData: this.state.ApiData,
      ApiFolder: this.state.ApiFolder,
      ApiNotes: this.state.ApiNotes,
      selectedFolder: this.state.selectedFolder,
      setSelectedFolder: this.setSelectedFolder,
      deleteNote: this.deleteNote,
      onDelete: this.onDelete
    };
    return (
      /*
<div className="App">
        <NotefulContext.Provider value={contextValue}>
          <Route exact path="/" component={Home} />
          <Route path={`/folder/:folderId`} component={Folder} />
          {/* <Route path={`/folder/:folderId`} component={NoteList} /> *}
          <Route path={`/addFolder`} component={AddFolder} />
          <Route path={`/note/:noteId`} component={Note} />
          <Route path={`/addNote`} component={AddNote} />
        </NotefulContext.Provider>
      </div>
*/
      <div className="App">
        <header className="header">
          <Header />
        </header>
        {/*  */}
        <NotefulContext.Provider value={contextValue}>
          {/* NAV */}
          {/* <nav className="sidebar" role="navigation" aria-label="Menu"> */}
          <nav>
            <Route exact path="/" component={FolderList} />
            <Route path={`/folder/:folderId`} component={FolderList} />
            <Route path={`/note/:noteId`} component={DisplayFolderDetails} />
            <Route path={`/addFolder`} component={FolderList} />
          </nav>
          {/* MAIN */}
          <main>
            <Route exact path="/" component={NoteList} />
            <Route path={`/folder/:folderId`} component={NoteList} />

            <Route path={`/note/:noteId`} component={DisplayNoteDetails} />

            <Route path={`/addFolder`} component={NewFolder} />

            <Route path={`/addNote`} component={AddNote} />
          </main>
        </NotefulContext.Provider>
      </div>
    );
  }
}

//export default withRouter(App);
export default App;
