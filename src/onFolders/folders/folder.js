import React from "react";
//import { Link } from "react-router-dom";
import NotefulContext from "../../context/NotefulContext";

export default function Folder(props) {
  console.log(props);
  return (
    <NotefulContext.Consumer>
      {context => (
        <div
          className="Folder"
          key={props.id}
          //data-div_id={id}
          // onClick={e => setSelectedFolder(folder.id)}
        >
          {/* Prop.fName is actually what is showing up in the sidebar of home
          Test it out by typing a  word in this div. it will showup in the side bar */}
          {props.fName}
        </div>
      )}
    </NotefulContext.Consumer>
  );
}
