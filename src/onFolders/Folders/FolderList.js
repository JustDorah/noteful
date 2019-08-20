import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NotefulContext from "../../context/NotefulContext";

import Folder from "./Folder";
import FolderErrorBoundary from "../../ErrorBoundaries/FolderErrorBoundary";

export default class FolderList extends Component {
  static contextType = NotefulContext;
  render() {
    // console.log(this.context.ApiFolder);
    //console.log(this.props);

    return (
      <NotefulContext.Consumer>
        {context => (
          <FolderErrorBoundary>
            <nav className="sidebar list" role="navigation" aria-label="Menu">
              <ul className="folderList">
                {context.ApiFolder.map(folder => {
                  /*console.log(folder.id); */
                  return (
                    <li className="eachFolder" id={folder.id} key={folder.id}>
                      {/* Trying out NAV link vs link */}
                      <NavLink
                        to={`/folder/${folder.id}`}
                        activeClassName="selectedFolder"
                      >
                        <Folder fName={folder.name} id={folder.id} />
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <br />
              <button
                className="sidebarBtn add"
                onClick={() => this.props.history.push("/addFolder")}
              >
                Add Folder
              </button>
            </nav>
          </FolderErrorBoundary>
        )}
      </NotefulContext.Consumer>
    );
  }
}
