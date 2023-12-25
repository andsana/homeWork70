import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">
            <NavLink to="/" className="nav-link">Contacts</NavLink>
        </span>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/new-contact" className="nav-link">New Contact</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;