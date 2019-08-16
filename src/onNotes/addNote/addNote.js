import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NotefulContext from "../../context/NotefulContext";
import ValidationError from "../../ErrorBoundaries/ValidationError";
import config from "../../store/config";

import "./addNote.css";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.noteNameInput = React.createRef();
    this.noteContentInput = React.createRef();
    this.noteFolderSelect = React.createRef();
    this.state = {
      newNote: {
        value: "",
        touched: false
      },
      newNoteContent: {
        value: "",
        touched: false
      },
      newNoteFolder: {
        value: "",
        touched: false
      },
      error: null
    };
  }

  static defaultProps = {
    ApiFolder: [],
    ApiNotes: [],
    addNote: () => {},
    onNewNoteCreation: () => {}
  };

  static contextType = NotefulContext;

  //POST new note
  handleNewNote = (e, callback) => {
    // e.preventDefault();

    const moment = require("moment");
    //using refs to get input info
    const title = {
      name: this.noteNameInput.current.value,
      //used to be  moment().format("Do MMM YYYY") but it depreciated.. so now just moment() form the docs
      modified: moment(),
      folderId: this.noteFolderSelect.current.value,
      content: this.noteContentInput.current.value
    };
    console.log("title(note): ", title);

    fetch(config.API_NOTES, {
      method: "POST",
      body: JSON.stringify(title),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Something went wrong. Please try again .");
        }
        return response.json();
      })
      .then(note => {
        console.log("addnote datat", note);
        console.log("hi!", callback);
        // console.log("this. prop.history", this.props.history);
        // this.context.addNote(note);

        //this.props.history.push("/note/" + note.id);
        callback(e, this.returnToFolder(note));
        //console.log(this.props.history, "NOTE.js page not redirecting");
      })
      .catch(e => this.setState({ APIError: e.message }));
  };

  returnToFolder = note => {
    console.log("going to folder", this.props);

    this.props.history.push("/folder/" + note.folderId);
  };

  onNewNoteCreation = e => {
    e.preventDefault();
    console.log("new note initiated");
    //handleNewNote
    this.handleNewNote(e, this.context.addNote);
  };

  /** UPDATING Changes to state*/
  //NOTE NAME
  updateNewNote(newName) {
    this.setState({
      newNote: { value: newName, touched: true }
    });
  }

  //NOTE NAME VALIDATION
  //Make sure note has a name, that it isn't blank
  validateNoteName(newName) {
    //trim() method removes whitespace from both ends of a string
    newName = this.state.newNote.value.trim();
    if (newName.length === 0) {
      return "Name is required";
    }
  }

  //NOTE CONTENT
  updateNewNoteContent(newName) {
    this.setState({
      newNoteContent: { value: newName, touched: true }
    });
  }

  folderChanged(newName) {
    this.setState({
      newNoteFolder: { value: newName, touched: true }
    });
  }

  //go home on cancel
  handleCancelButton = () => {
    this.props.history.push("/");
  };

  /** ****THE RENDER**** */
  render() {
    // const { ApiFolder, ApiNotes } = this.context;
    const nameError = this.validateNoteName();

    let folder = this.context.ApiFolder.map(folder => (
      <option value={folder.id}>{folder.name}</option>
    ));

    return (
      <div className="addNote">
        <h2>Create a Note</h2>
        <form className="addNoteForm" onSubmit={e => this.onNewNoteCreation(e)}>
          <div className="form-group">
            <label htmlFor="noteName">
              Please Enter the Name of the note below:
            </label>
            {/* NAME */}
            <input
              type="text"
              className="addNote_text"
              name="noteName"
              id="noteName"
              ref={this.noteNameInput}
              onChange={e => this.updateNewNote(e.target.value)}
            />
            <div className="errorMessage">
              {this.state.newNote.touched && (
                <ValidationError message={nameError} />
              )}
            </div>
            <label htmlFor="noteContent">
              Please Enter the Name of the note below:
            </label>
            <br />
            {/* CONTENT */}
            <textarea
              type="text"
              className="addNote_text"
              name="noteContent"
              id="noteContent"
              //defaultValue="Interesting"
              ref={this.noteContentInput}
              onChange={e => this.updateNewNoteContent(e.target.value)}
            />
          </div>
          <br />
          <label htmlFor="folderName">Please select a folder</label>
          <br />
          <select
            className="selectNoteFolder"
            name="noteFolder"
            id="noteFolder"
            ref={this.noteFolderSelect}
            required
            onChange={e => this.folderChanged(e.target.value)}
          >
            <option value="">Select a folder...</option>
            {folder}
          </select>
          <div className="errorMessage">
            {this.state.newNoteFolder.touched && (
              <ValidationError message={nameError} />
            )}
          </div>

          <br />
          <div className="addFolder__button__group">
            <button
              type="reset"
              className="addNote_cancelBtn"
              onClick={this.handleCancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="addNote_saveBtn"
              disabled={this.validateNoteName()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AddNote);
