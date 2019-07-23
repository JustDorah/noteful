import React from "react";
import "./folderList.css";

export default function FolderList(props) {
  //const notes = props.notes;
  //console.log(notes, "the notes");
  return (
    <div>
      <div className="List">{props.mainFolders}</div>

      <div className="fButton"> Add Folder </div>
    </div>
  );
}
