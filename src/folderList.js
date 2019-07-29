import React from "react";
import "./folderList.css";
//import Folder from "./folder";

export default function FolderList(props) {
  return (
    <div className="List">
      <div>{props.mainFolders}</div>
      <div className="fButton"> Add Folder </div>
    </div>
  );
}
