import React, { Component } from "react";
import NotefulContext from "../NotefulContext";
import ValidationError from "../errorBoundaries/validationError";
import config from "../config";
//import moment = require("moment");

//import "./addFolder.css";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.noteNameInput = React.createRef();
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
  handleNewFolder = e => {
    e.preventDefault();
    const moment = require("moment");
    const title = {
      name: this.noteNameInput.current.value,
      modified: moment().format("Do MMM YYYY"),
      folderId: this.noteNameInput.current.value,
      content: this.noteNameInput.current.value
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
        this.context.addNote(note);
        this.props.history.push("/note/" + note.id);
      })
      .catch(e => this.setState({ APIError: e.message }));
  };

  render() {
    // const { ApiFolder, ApiNotes } = this.context;
    //const nameError = this.validateFolderName();
    let folder = this.context.ApiFolder.map(folder => (
      <option value={folder.id}>{folder.name}</option>
    ));
    // console.log(folder);
    return (
      <div className="addFolder">
        <h2>Create a folder</h2>
        <form
          className="addFolder_form"
          onSubmit={e => this.handleNewFolder(e)}
        >
          {/* <div className="addFolder__hint">* required field</div>
          <br /> */}
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
              //defaultValue="Interesting"
              ref={this.noteNameInput}
              onChange={e => this.updateNewNoteName(e.target.value)}
            />
            {/* <div className="errorMessage">
              {this.state.newFolder.touched && (
                <ValidationError message={nameError} />
              )}
            </div> */}
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
              required
              onChange={e => this.folderChanged(e.target.value)}
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
              className="addFolder_cancelBtn"
              onClick={this.handleCancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="addFolder_saveBtn"
              // disabled={this.validateFolderName()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
