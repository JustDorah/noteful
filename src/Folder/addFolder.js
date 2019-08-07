import React, { Component } from "react";
import NotefulContext from "../NotefulContext";
import ValidationError from "../errorBoundaries/validationError";
import config from "../config";

import "./addFolder.css";

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

  handleNewFolder = e => {
    e.preventDefault();
    //let { folderName } = e.target;
    // console.log(folderName.value);
    //const title = this.folderNameInput.current.value;
    const title = { folderName: this.folderNameInput.current.value };
    console.log("title: ", title);

    fetch(config.API_FOLDERS, {
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
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.push("/folder/" + folder.id);
      })
      .catch(e => this.setState({ APIError: e.message }));
  };

  updateNewFolder(newName) {
    this.setState({
      newFolder: { value: newName, touched: true }
    });
  }
  validateFolderName(newName) {
    //trim() method removes whitespace from both ends of a string
    newName = this.state.newFolder.value.trim();
    if (newName.length === 0) {
      return "Name is required";
    } else if (
      !this.context.ApiFolder.find(
        f => f.name.toLowerCase() === newName.toLowerCase()
      ) === false
    ) {
      return "There is already a folder by that name. Please chose a new name";
    }
  }
  handleCancelButton = () => {
    this.props.history.push("/");
  };
  render() {
    const nameError = this.validateFolderName();
    return (
      <div className="addFolder">
        <h2>Create a folder</h2>
        <form
          className="addFolder_form"
          onSubmit={e => this.handleNewFolder(e)}
        >
          <div className="addFolder__hint">* required field</div>
          <br />
          <div className="form-group">
            <label htmlFor="folderName">Title *</label>
            <input
              type="text"
              className="addFolder_text"
              name="folderName"
              id="Foldername"
              defaultValue="Interesting"
              ref={this.folderNameInput}
              onChange={e => this.updateNewFolder(e.target.value)}
            />
            {this.state.newFolder.touched && (
              <ValidationError message={nameError} />
            )}
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
            <button type="submit" className="addFolder_saveBtn">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
