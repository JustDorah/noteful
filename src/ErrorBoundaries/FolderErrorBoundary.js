import React, { Component } from "react";

export default class FolderErrorBoundary extends Component {
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
          Looks like an error occurred at the creation of the list of folders.
          Please try refreshing the page again. Thank you!
        </h1>
      );
    } else {
      // console.log("the children in errorBoundary", this.props.children);
      return this.props.children;
    }
  }
}
