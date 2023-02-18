import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="main-footer">
      <strong>
        Copyright © 2014-2021 <Link to={"#"}>AdminLTE.io</Link>.
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.2.0
      </div>
    </footer>
  );
};

export default Footer;
