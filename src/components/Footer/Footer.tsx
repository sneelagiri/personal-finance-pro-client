import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./footer.css";
interface Props {}
interface State {}

export default class Footer extends Component<Props, State> {
  state = {};

  render() {
    return (
      <footer className="footer">
        <p className="footerText">Made with ❤️ by Shashank Neelagiri</p>
      </footer>
    );
  }
}
