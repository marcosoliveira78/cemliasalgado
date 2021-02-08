/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Nav, Navbar, NavDropdown, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import {
  FaDoorOpen, FaUserCircle, FaUserTie, FaWhmcs, FaBookReader,
} from 'react-icons/fa';
import { DropdownSubmenu, NavDropdownMenu } from 'react-bootstrap-submenu';
import { uniqueId } from 'lodash';
import logo from '../../assets/image/logo(white).png';
// import Auth from '../../services/auth';
import './styles.css';
import { NavTitle } from './styles';
import { Container } from '../../pages/styles';

function NavMenu() {
  // Hooks

  // Context

  // Variables
  const history = useHistory();

  // Functions
  const closeSession = (type) => {
    // Auth.logout(type);
    history.push('/');
  };

  // Handles
  const handlerLogout = async (event) => {
    event.preventDefault();
    closeSession('logout');
  };

  // LocalStorage

  // Triggers

  // Renders
  const adminNavDropdownTitle = (
    <>
      <OverlayTrigger placement="bottom-start" overlay={<Tooltip id={uniqueId()}>Administração</Tooltip>}>
        <FaWhmcs className="fa-style" />
      </OverlayTrigger>
    </>
  );
  return (
    <>
      <Navbar className="menu">
        <Container>
          <Navbar.Brand>
            <NavTitle>Conservatório Estadual de Música Lia Salgado</NavTitle>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavMenu;
