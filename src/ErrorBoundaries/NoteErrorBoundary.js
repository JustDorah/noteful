import React, { Component } from "react";

export default class NoteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError(err) {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return (
        <h1>
          Looks like an error occurred at the creation of the list of notes.
          Please try refreshing the page again. Thank you!
        </h1>
      );
    } else {
      //   console.log("the children in NoteErrorBoundary", this.props.children);
      return this.props.children;
    }
  }
}
