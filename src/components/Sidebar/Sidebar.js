import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import gridIcon from '../../images/icons/grid 1.png'
import plusIcon from '../../images/icons/plus 1.png'

const Sidebar = () => {
  return (
    <div>
      <Link className="navbar-brand text-center" to="/">
        <h4 className='text-info mt-4'>BOOK BAY</h4>
      </Link>
      <NavLink activeClassName='active' className='admin-option d-flex px-3 px-sm-5 py-3' to="/admin/manage-books">
        <img src={gridIcon} className=' icon' alt="" />
        <h6>&nbsp; Manage Books</h6>
      </NavLink>
      <NavLink  activeClassName='active' className=' admin-option d-flex px-3 px-sm-5 py-3' to={"/admin/add-book"||"/admin"}>
        <img src={plusIcon} className=' icon' alt="" />
        <h6>&nbsp; Add Book</h6>
      </NavLink>
    </div>
  );
};

export default Sidebar;