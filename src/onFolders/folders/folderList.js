import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NotefulContext from "../../context/NotefulContext";

import Folder from "./folder";

export default class FolderList extends Component {
  render() {
    return (
      <NotefulContext.Consumer>
        {context => (
          <div className="folderList">
            {/* stuff */}
            {/* <h3>FOLDER LIST</h3> */}
            {context.ApiFolder.map(folder => {
              /*console.log(folder.id); */
              return (
                <div className="eachFolder" id={folder.id} key={folder.id}>
                  {/* Trying out NAV link vs link */}
                  <NavLink
                    to={`/folder/${folder.id}`}
                    activeClassName="selectedFolder"
                  >
                    <Folder fName={folder.name} id={folder.id} />
                  </NavLink>
                </div>
              );
            })}
          </div>
        )}
      </NotefulContext.Consumer>
    );
  }
}
