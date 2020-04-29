import React, { ReactElement } from "react";
import "./footer.css";

interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <footer className="footer">
      <p className="footerText">
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by Shashank Neelagiri
      </p>
    </footer>
  );
}
