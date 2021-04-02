import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserContext } from '../../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className='header'>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className='container'>
          <Link className="navbar-brand" to="/">
            <h4 className='text-info'>BOOK BAY</h4>
          </Link>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="ms-auto navbar-nav">
              <li className="nav-item me-5">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to="">Deals</Link>
              </li>
            </ul>
            {!loggedInUser.success?<Link to='/login'>
              <button className='btn btn-danger'>Login</button>
            </Link>:<img src={loggedInUser.photoURL} className='image' alt=''></img>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;