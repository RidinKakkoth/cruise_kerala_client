import "./Navbar.css";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <Link to="/subscribers">Subscribers</Link>
        <Link to="/video-management">Video Management</Link>
        <Link className="active_link" to="/admin">
          Admin
        </Link>
      </div>
      <div className="navbar__right">
        <Link to="/search">
          <i className="fa fa-search" aria-hidden="true"></i>
        </Link>
        <Link to="/notifications">
          <i className="fa fa-clock-o" aria-hidden="true"></i>
        </Link>
        <Link to="/profile">
          <img width="30" src={avatar} alt="avatar" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
