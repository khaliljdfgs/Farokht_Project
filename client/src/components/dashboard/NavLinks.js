import { NavLink } from "react-router-dom";
// import NavLinksData from '../../utils/NavLinksData'
import {AiOutlineShoppingCart, AiOutlineShopping, AiOutlineTags} from "react-icons/ai"
import {MdOutlineVideogameAsset, MdOutlineAttachEmail, MdPayment } from "react-icons/md"
import {RxComponentNone } from "react-icons/rx"
import {TbReportAnalytics } from "react-icons/tb"
import {FiUsers } from "react-icons/fi"
import {VscSignOut } from "react-icons/vsc"



const NavLinks = ({ toggleSidebar }) => {
  return (
    <ul
      className="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <li className="nav-header">Transections</li>
      <li className="nav-item">
        <NavLink to={'/dashboard'} className={({ isActive })=> isActive ? 'nav-link active':'nav-link'}>
          {/* <i className="nav-icon far fa-calendar-alt" /> */}
          <AiOutlineShoppingCart className="nav-icon" />
          <p>
            Orders
            <span className="badge badge-info right">2</span>
          </p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/item'} className={({ isActive })=> isActive ? 'nav-link active':'nav-link'}>
          <AiOutlineShopping className="nav-icon" />
          <p>Items</p>
        </NavLink>
      </li>
      <li className="nav-header">Setups</li>
      <li className="nav-item">
        <NavLink to={'/unitOfMeasure'} className={({ isActive })=> isActive ? 'nav-link active':'nav-link'}>
          <MdOutlineVideogameAsset className="nav-icon" />
          <p>Unit of Measures</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/item'} className={({ isActive })=> isActive ? 'nav-link active':'nav-link'}>
          <RxComponentNone className="nav-icon" />
          <p>Attributes</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/item'} className={({ isActive })=> isActive ? 'nav-link active':'nav-link'}>
          <AiOutlineTags className="nav-icon" />
          <p>Tags</p>
        </NavLink>
      </li>
      <li className="nav-header">Reports</li>
      <li className="nav-item">
        <NavLink to={'/item'} className={({ isActive })=> isActive ? 'nav-link active':'nav-link'}>
          <TbReportAnalytics className="nav-icon" />
          <p>Downloadable Data</p>
        </NavLink>
      </li>
      <li className="nav-header">User Managment</li>
      <li className="nav-item">
        <NavLink to={'/user'} className={({ isActive })=> isActive ? 'nav-link active':'nav-link'}>
          <FiUsers className="nav-icon" />
          <p>Users</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/item'} className={({ isActive })=> isActive ? 'nav-link active':'nav-link'}>
          <MdOutlineAttachEmail className="nav-icon" />
          <p>Email Notification</p>
        </NavLink>
      </li>
      <li className="nav-header">Paymet Managment</li>
      <li className="nav-item">
        <NavLink to={'/item'} className={({ isActive })=> isActive ? 'nav-link active':'nav-link'}>
          <MdPayment className="nav-icon" />
          <p>Payments</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/item'} className={({ isActive })=> isActive ? 'nav-link active':'nav-link'}>
          <VscSignOut className="nav-icon" />
          <p>Logout</p>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
