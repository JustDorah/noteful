import React, { Component } from "react";
import NotefulContext from "../../context/NotefulContext";
//import NotefulContext from "../NotefulContext";
//import ValidationError from "./errorBoundaries/validationError";
//import config from "../config";

import "./AddFolder.css";

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.folderNameInput = React.createRef();
    this.state = {
      newFolder: {
        value: "",
        touched: false
      },
      error: null
    };
  }

  static contextType = NotefulContext;

  render() {
    return (
      <div className="AddFolder">
        <form
          className="addFolder_form"
          // onSubmit={e => this.handleNewFolder(e)}
        >
          <h2>Create a folder</h2>
          {/* <div className="addFolder__hint">* required field</div>
          <br /> */}
          <div className="form-group">
            <label htmlFor="folderName">
              Please enter the name of the folder below:
            </label>
            <input
              type="text"
              className="addFolder_text"
              name="folderName"
              id="folderName"
              //defaultValue="Interesting"
              ref={this.folderNameInput}
              // onChange={e => this.updateNewFolder(e.target.value)}
            />
            <div className="errorMessage">
              {this.state.newFolder.touched &&
                {
                  /* <ValidationError message={nameError} /> */
                }}
            </div>
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
