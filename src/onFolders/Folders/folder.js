import React from "react";
//import { Link } from "react-router-dom";

export default function Folder(props) {
  // console.log(props);
  return (
    <div
      className="Folder"
      key={props.id}
      //data-div_id={id}
      // onClick={e => setSelectedFolder(folder.id)}
    >
      {props.fName}
    </div>
  );
}
