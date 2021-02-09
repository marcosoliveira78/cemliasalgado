/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Nav, Navbar, NavDropdown, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import {
  FaDoorOpen, FaUniversity,
} from 'react-icons/fa';
import { DropdownSubmenu, NavDropdownMenu } from 'react-bootstrap-submenu';
import { uniqueId } from 'lodash';
import logo from '../../assets/image/logo(white).png';
// import Auth from '../../services/auth';
import './styles.css';
import { NavTitle } from './styles';
import { Container } from '../../pages/styles';
import { useLogin } from '../../Context/Login';
import { logout } from '../../services/auth';

function NavMenu() {
  // Hooks

  // Context
  const { login, setLogin } = useLogin();

  // Variables
  const history = useHistory();
  const admin = true;

  // Functions
  const closeSession = (type) => {
    logout(type);
    setLogin(false);
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
        <FaUniversity className="fa-style" />
      </OverlayTrigger>
    </>
  );
  return (
    <>
    { login && (
      <>
      <Navbar className="menu">
        <Container>
          <Navbar.Brand>
            <NavTitle>Conservatório Estadual de Música Lia Salgado</NavTitle>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar expand="sm" className="sub-menu">
      <Container style={{ margin: '0 50px' }}>
        <Navbar.Brand>
          <Link to="/Home" className="link">
            <OverlayTrigger placement="bottom-end" overlay={<Tooltip id={uniqueId()}>Página Inicial</Tooltip>}>
              <img style={{ fontSize: '20px', cursor: 'pointer' }} src={logo} alt="logo" className="sub-menu-imagem" />
            </OverlayTrigger>
          </Link>
        </Navbar.Brand>
      {/* </Container>
        <Container style={{ display: 'flex', justifyContent: 'flex-end' }}> */}
        <Nav className="mr-auto">
          {
            admin && (
            <>
                <NavDropdownMenu className="dropdown" title={adminNavDropdownTitle} id="AdiministracaoDropdown">
                    <NavDropdown.Item as="span">
                        <Link to="/ListagemGeral" className="link">
                            <span className="span">Matrículas</span>
                        </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item as="span">
                        <Link to="/Usuario" className="link">
                            <span className="span">Usuários</span>
                        </Link>
                    </NavDropdown.Item>
                </NavDropdownMenu>
            </>
            )
          }
        </Nav>
        <Navbar.Brand>
          <OverlayTrigger placement="bottom-start" overlay={<Tooltip id={uniqueId()}>Sair</Tooltip>}>
                                    <FaDoorOpen className="fa-style" onClick={handlerLogout} />
          </OverlayTrigger>
        </Navbar.Brand>
      </Container>
      </Navbar>
      </>
    )}
    </>
  );
}

export default NavMenu;
