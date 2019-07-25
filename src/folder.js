import React, { Component } from "react";
import { Link } from "react-router-dom";
import FolderList from "./folderList";
import "./folder.css";

export default class Folder extends Component {
  static defaultProps = {
    onAddFolder: () => {}
  };

  //  displayEachFolder = e => {};
  render() {
    console.log(this.props.folderNotes, "in folder");

    return (
      <div>
        <header className="mainHeader">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>

        <nav className="sidebar">
          <FolderList mainFolders={this.props.mainFolders} />
        </nav>

        <main className="main"> just filling space</main>
      </div>
    );
  }
}

/** 
   * folders: [
    {
      id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: "Important"
    },
    {
      id: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: "Super"
    },
    {
      id: "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: "Spangley"
    }
  ],
   */
// //const notes = props.notes;
// //console.log(notes, "the notes");
// return (
//   <div className="folder">
//     <div>{/* stuff */}</div>

//     <div className="fButton">{/* stuff */}</div>
//   </div>
// );
