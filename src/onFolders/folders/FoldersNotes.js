import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import NotefulContext from "../../context/NotefulContext";

import Folder from "./folder";

class FoldersNotes extends Component {
  static contextType = NotefulContext;
  render() {
    console.log(this.context.ApiFolder);
    console.log(this.props);

    return (
      <NotefulContext.Consumer>
        {context => ({
          /* stuff */
        })}
      </NotefulContext.Consumer>
    );
  }
}
export default withRouter(FoldersNotes);
