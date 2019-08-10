import React, { Component } from "react";
//import { Link } from "react-router-dom";

export default class Folder extends Component {
  render() {
    const { fName, key } = this.props;

    return (
      <div className="Folder">
        {/* stuff */}
        <h3>FOLDER</h3>
        <div
          className="eachFolder"
          key={key}
          data-div_id={key}
          // onClick={e => setSelectedFolder(folder.id)}
        />
        {fName}
      </div>
    );
  }
}
