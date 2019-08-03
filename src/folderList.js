import React from "react";
import NotefulContext from "./NotefulContext";

import "./folderList.css";

//import Folder from "./folder";

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
