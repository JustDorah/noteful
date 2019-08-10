import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import ValidationError from "../Folder/errorBoundaries/validationError";
import config from "../config";
//import moment = require("moment");

//import "./addFolder.css";

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

  static contextType = NotefulContext;

  //POST new note
  handleNewNote = (e, callback) => {
    e.preventDefault();

    //console.log("noteContent: ", noteContent);
    const moment = require("moment");
    //using refs to get input info
    const title = {
      name: this.noteNameInput.current.value,
      modified: moment().format("Do MMM YYYY"),
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
        console.log("hi!", callback);
        console.log("this. prop.history", this.props.history);
        this.context.addNote(note);

        this.props.history.push("/note/" + note.id);
        callback(note);
        //console.log(this.props.history, "NOTE.js page not redirecting");
      })
      .catch(e => this.setState({ APIError: e.message }));
  };
  updateNewNote(newName) {
    this.setState({
      newNote: { value: newName, touched: true }
    });
  }
  //Make sure note has a name, that it isn't blank
  validateNoteName(newName) {
    //trim() method removes whitespace from both ends of a string
    newName = this.state.newNote.value.trim();
    if (newName.length === 0) {
      return "Name is required";
    }
  }
  handleCancelButton = () => {
    this.props.history.push("/");
  };
  render() {
    // const { ApiFolder, ApiNotes } = this.context;
    //const nameError = this.validateFolderName();
    let folder = this.context.ApiFolder.map(folder => (
      <option value={folder.id}>{folder.name}</option>
    ));
    // console.log(folder);

    const nameError = this.validateNoteName();
    return (
      <div className="addFolder">
        <h2>Create a Note</h2>
        <form className="addFolder_form" onSubmit={e => this.handleNewNote(e)}>
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
              // onChange={e => this.updateNewNoteContent(e.target.value)}
            />
            {/* <div className="errorMessage">
              {this.state.newFolder.touched && (
                <ValidationError message={nameError} />
              )}
            </div> */}
            <br />
            <label htmlFor="folderName">Please select a folder</label>
            <br />
            <select
              className="selectNoteFolder"
              name="noteFolder"
              id="noteFolder"
              ref={this.noteFolderSelect}
              required
              // onChange={e => this.folderChanged(e.target.value)}
            >
              <option value="">Select a folder...</option>
              {folder}
            </select>
            {/* <div className="errorMessage">
              {this.state.newFolder.touched && (
                <ValidationError message={nameError} />
              )}
            </div> */}
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
