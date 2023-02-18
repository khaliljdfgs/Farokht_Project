import NavLinks from "./NavLinks";
import { Link } from 'react-router-dom'

const SideNav = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to={"index3.html"} className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="Company Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Admin Panel</span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User "
            />
          </div>
          <div className="info">
            <Link to={"#"} className="d-block">
              User Loged In
            </Link>
          </div>
        </div>
        
        
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <NavLinks/>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default SideNav;
