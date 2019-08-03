import React from "react";
//import { Route } from "react-router-dom";
import NotefulContext from "./NotefulContext";
//import Folder from "./folder";
import "./folderList.css";

/***
 When to use context???
*/
export default function FolderList(props) {
  return (
    <NotefulContext.Consumer>
      {context => (
        <div className="List">
          <div>{props.mainFolders}</div>
          <div className="fButton"> Add Folder </div>
        </div>
      )}
    </NotefulContext.Consumer>
  );
}
