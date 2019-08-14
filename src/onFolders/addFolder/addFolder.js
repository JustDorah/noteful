import React, { Component } from "react";
import NotefulContext from "../../context/NotefulContext";
import { withRouter } from "react-router-dom";
import config from "../../store/config";
import ValidationError from "../../ErrorBoundaries/ValidationError";

import "./AddFolder.css";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.folderNameInput = React.createRef();
    this.state = {
      newFolder: {
        value: "",
        touched: false
      },
      error: null,
      fetchError: ""
    };
  }
  static defaultProps = {
    ApiFolder: [],
    addFolder: () => {},
    onNewFolderCreation: () => {}
  };
  static contextType = NotefulContext;

  /** *** CREATE NEW FOLDER REQUEST*** */
  handleNewFolder(folderName, callback) {
    //e.preventDefault();
    //let { folderName } = e.target;
    // console.log(folderName.value);
    //const title = this.folderNameInput.current.value;
    const title = {
      name: folderName
    };
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
        console.log(folder);
        console.log("Callback...", callback);
        // console.log(this.props);
        // this.context.addFolder(folder);
        // this.props.history.push("/");
        callback(folder, this.returnHome(folder));
      })
      .catch(e => this.setState({ APIError: e.message }));
  }

  returnHome = folder => {
    console.log("Goint to folder!! :)", this.props);

    this.props.history.push("/folder/" + folder.id);
  };

  onNewFolderCreation = e => {
    e.preventDefault();
    console.log("new folder initiated!");
    console.log(this.folderNameInput.current.value);
    const folderName = this.folderNameInput.current.value;
    this.handleNewFolder(folderName, this.context.addFolder);
    //this.returnHome();
  };

  /** */
  updateNewFolder(newName) {
    this.setState({
      newFolder: { value: newName, touched: true }
    });
  }

  //verify name created
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

  //go home on cancel
  handleCancelButton = () => {
    this.props.history.push("/");
  };

  /** ****THE RENDER**** */
  render() {
    const nameError = this.validateFolderName();

    return (
      <div className="AddFolder">
        <h2>Create a folder</h2>
        <form
          className="addFolder_form"
          onSubmit={e => this.onNewFolderCreation(e)}
        >
          <div className="form-group">
            <label htmlFor="folderName">
              Please Enter the Name of the folder below:
            </label>
            <input
              type="text"
              className="addFolder_text"
              name="folderName"
              id="folderName"
              ref={this.folderNameInput}
              onChange={e => this.updateNewFolder(e.target.value)}
            />
            <div className="errorMessage">
              {this.state.newFolder.touched && (
                <ValidationError message={nameError} />
              )}
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
              disabled={this.validateFolderName()}
            >
              Save
            </button>
          </div>
        </form>{" "}
        <p className="error">{this.state.fetchError}</p>
      </div>
    );
  }
}

export default withRouter(AddFolder);
