import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import NotefulContext from "../../context/NotefulContext";

import Folder from "./folder";

class FolderList extends Component {
  static contextType = NotefulContext;
  render() {
    console.log(this.context.ApiFolder);
    console.log(this.props);

    return (
      <NotefulContext.Consumer>
        {context => (
          <div className="folderList">
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
export default withRouter(FolderList);
