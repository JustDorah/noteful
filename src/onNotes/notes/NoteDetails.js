import React, { Component } from "react";
import NotefulContext from "../../context/NotefulContext";
//import { Link, withRouter } from "react-router-dom";
//import "../../utils/helper-functions";

import Note from "./note";
//import "./noteList.css";

class NoteDetails extends Component {
  static defaultProps = {
    ApiNotes: []
  };
  static contextType = NotefulContext;

  render() {
    return <div className="main">Hi</div>;
  }
}

export default NoteDetails;
