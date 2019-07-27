import React from "react";
import "./folderList.css";
//import Folder from "./folder";

export default function FolderList(props) {
  //const notes = props.notes;
  //console.log(notes, "the notes");
  return (
    <div className="List">
      <div>{props.mainFolders}</div>
      {/* <Folder mainFolders={props.mainFolders} folderNotes={props.folderNotes} /> */}

      <div className="fButton"> Add Folder </div>
    </div>
  );
}
