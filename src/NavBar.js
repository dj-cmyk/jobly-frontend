import React, {useContext} from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from './UserContext';
import "./NavBar.css";

function NavBar({logout}) {
  const user = useContext(UserContext)

  
    if (user) {
        return(
          <Navbar expand="md" className="NavBar" >
            <NavLink exact to="/" className="navbar-brand btn outline-secondary">
              Jobly
            </NavLink>

            <Nav className="ml-auto NavBar" navbar>
              <NavItem>
                <NavLink to="/companies" className="btn outline-secondary btn-sm">Companies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/jobs" className="btn outline-secondary btn-sm">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile" className="btn outline-secondary btn-sm">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" onClick={logout} className="btn outline-secondary btn-sm">Logout {user.firstName}</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        )
    } else {
      return(
        <Navbar expand="md" className="NavBar" >
          <NavLink exact to="/" className="navbar-brand btn outline-secondary">
            Jobly
          </NavLink>
  
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/login" className="btn outline-secondary btn-sm">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup" className="btn outline-secondary btn-sm">Sign Up</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      )
    }
    
}


export default NavBar;