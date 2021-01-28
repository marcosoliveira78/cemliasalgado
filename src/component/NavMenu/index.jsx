/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Nav, Navbar, Container, NavDropdown, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import {
  FaDoorOpen, FaUserCircle, FaUserTie, FaWhmcs, FaBookReader,
} from 'react-icons/fa';
import { DropdownSubmenu, NavDropdownMenu } from 'react-bootstrap-submenu';
import { uniqueId } from 'lodash';
import logo from '../../assets/image/logo(white).png';
// import logoEnergisa from '../../assets/img/logoEnergisa.png';
// import logoEllevo from '../../assets/img/logo-ellevo-simbolo.svg';
import Auth from '../../services/auth';
import './styles.css';
// import ShowMessage from '../services/toast';

function NavMenu() {
  // Hooks
  //   const [tempo, setTempo] = useState();
  //   const [exibeTempoSessao, setExibeTempoSessao] = useState(false);
  //   const [, setRenovaSessao] = useState(false);

  // Context
  const login = true;
  const admin = true;
  //   const { login, setLogin } = useLogin();
  //   const { admin, setAdmin } = useLogin();

  // Variables
  const history = useHistory();
  //   const usuarioLogado = Auth.getUserLogged();
  //   const exibirTempoSessao = 2; // em minutos
  //   let sessionID = '';
  //   let urlEllevo = '';
  //   let tempoRestante = 0;
  //   let tempoSessao = 0;
  //   let horaAtual = 0;
  //   let time = 15;
  //   if (admin) {
  //     time = 30;
  //   }

  // Functions
  const closeSession = (type) => {
    Auth.logout(type);
    history.push('/');
    // setLogin(false);
    // setAdmin(false);
  };

  //   const startCountdown = () => {
  //     if (localStorage.USER_LOGGED !== undefined) {
  //       tempoSessao = JSON.parse(localStorage.USER_LOGGED).expireSession;
  //       horaAtual = Math.floor(+new Date() / 1000);
  //       tempoRestante = tempoSessao - horaAtual;
  //       const min = Math.trunc(tempoRestante / 60);
  //       const seg = (`0${(tempoRestante % 60)}`).slice(-2);
  //       setTempo(`${min}:${seg}`);
  //       //   console.log(`${min}:${seg}`);
  //       if (tempoRestante <= (exibirTempoSessao * 60)) {
  //         setExibeTempoSessao(true);
  //         setRenovaSessao(true);
  //       } else {
  //         setExibeTempoSessao(false);
  //         setRenovaSessao(false);
  //       }
  //       if (tempoRestante === (exibirTempoSessao * 60)) {
  //         ShowMessage('warning', 'Sua sessão expirará em breve.', 10000, 1);
  //       }
  //       if (tempoRestante <= 0) {
  //         closeSession('expireSession');
  //         return false;
  //       }
  //     //   setTimeout(() => {
  //     //     startCountdown();
  //     //   }, 1000);
  //     }
  //     return true;
  //   };

  //   const refreshSession = (refreshTime) => {
  //     Auth.extendSession(refreshTime); // reinicia a contagem da session do sistema
  //   };

  // Handles
  const handlerLogout = async (event) => {
    event.preventDefault();
    closeSession('logout');
  };

  // LocalStorage
  //   if (localStorage.URL_ELLEVO !== undefined) {
  //     urlEllevo = localStorage.URL_ELLEVO;
  //   }

  //   if (login) {
  //     if (localStorage.USER_LOGGED !== undefined) {
  //       sessionID = JSON.parse(localStorage.USER_LOGGED).sessionID;
  //     }
  //   }

  // Triggers
  //   useEffect(() => {
  //     startCountdown();
  //   }, [login]);

  // Renders
  const adminNavDropdownTitle = (
    <>
      <OverlayTrigger placement="bottom-start" overlay={<Tooltip id={uniqueId()}>Administração</Tooltip>}>
        <FaWhmcs className="fa-style" />
      </OverlayTrigger>
    </>
  );
    //   const contatoNavDropdownTitle = (
    //         <>
    //             <OverlayTrigger placement="bottom-end" overlay={
    //    <Tooltip id={uniqueId()}>Fale com a CSE</Tooltip>}>
    //                 <FaRegComments className="fa-style" />
    //             </OverlayTrigger>
    //         </>
    //   );
  return (
    <>
      {login && (
        <>
          <Navbar className="menu">
            <Container>
              <Navbar.Brand style={{ marginRight: '5px' }}>
                <Link to="/Home" className="link">
                  <OverlayTrigger placement="bottom-end" overlay={<Tooltip id={uniqueId()}>Página Inicial</Tooltip>}>
                    <img src={logo} style={{ width: '25px' }} alt="AWCSE" className="sub-menu-imagem" />
                  </OverlayTrigger>
                </Link>
              </Navbar.Brand>
              {/* </Container>
                        <Container> */}
              <Navbar.Brand href="#" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                {/* <img src={logo}
                style={{ width: '25px' }}
                alt="Energisa logo"
                className="menu-imagem" /> */}
                <span style={{ fontFamily: 'Lovers Quarrel', fontSize: '5vh' }}>Conservatório Estadual de Música Lia Salgado</span>
              </Navbar.Brand>
              {/* <Navbar.Brand className="nav-bar-text">
                                {
                                        !admin && (
                                            <FaUserCircle
                                            style={{ fontSize: '20px', marginRight: '10px' }}
                                            title={`Seja bem vindo,
                                            ${Auth.getUserLogged().informacoesUsuario.usuarioNome}`}
                                             />
                                        )
                                    }

                                    {
                                        admin && (
                                            <FaUserTie
                                            style={{ fontSize: '20px', marginRight: '10px' }}
                                            title={`Seja bem vindo administrador,
                                            ${Auth.getUserLogged().informacoesUsuario.usuarioNome}`}
                                             />
                                        )
                                    }
                                {`Seja bem-vindo!`}
                            </Navbar.Brand> */}
            </Container>
          </Navbar>

          {/* <Navbar expand="sm" className="sub-menu">
                        <Container>
                            <Navbar.Brand style={{ marginRight: '5px' }}>
                                <Link to="/Home" className="link">
                                    <OverlayTrigger
                                    placement="bottom-end"
                                    overlay={<Tooltip id={uniqueId()}>Página Inicial</Tooltip>}>
                                        <img src={logo}
                                        style={{ width: '25px' }}
                                        alt="AWCSE" className="sub-menu-imagem" />
                                    </OverlayTrigger>
                                </Link>
                            </Navbar.Brand> */}
          {/* {login && (
                                    <Navbar.Text>
                                        <a onClick={() => refreshSession(time)}
                                        href={`${urlEllevo}/Principal.asp?SessionID=${sessionID}`}
                                        target="_blank" rel="noreferrer">
                                            <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={uniqueId()}>Ambiente Ellevo</Tooltip>}>
                                                <img src={logoEllevo}
                                                alt="Ellevo"
                                                className="sub-menu-imagem" />
                                            </OverlayTrigger>
                                        </a>
                                    </Navbar.Text>
                                )} */}
          {/* <Navbar.Text style={{ marginLeft: '10px' }}>
                                <Link to="/Chamados" className="link">
                                    <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <Tooltip id={uniqueId()}>Meus Chamados</Tooltip>}>
                                        <FaBookReader className="fa-style" />
                                    </OverlayTrigger>
                                </Link>
                            </Navbar.Text> */}
          {/* <Nav className="mr-auto">
                                {
                                    admin && (
                                        <>
                                            <NavDropdownMenu className="dropdown"
                                            title={adminNavDropdownTitle}
                                            id="AdiministracaoDropdown">
                                                <NavDropdown.Item as="span">
                                                    <Link to="/Grupo/Consultar" className="link">
                                                        <span className="span">Grupos</span>
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item as="span">
                                                    <Link to="/Item/Consultar" className="link">
                                                        <span className="span">Itens</span>
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item as="span"
                                                style={{ paddingLeft: '10px' }}>
                                                    <DropdownSubmenu href="#" title="Upload">
                                                        <NavDropdown.Item as="span">
                                                            <Link to="/Upload/Imagens" className="link">
                                                                <span className="span">Upload Imagens</span>
                                                            </Link>
                                                        </NavDropdown.Item>
                                                        <NavDropdown.Item as="span">
                                                            <Link to="/Upload/Background" className="link">
                                                                <span className="span">Upload Plano de Fundo</span>
                                                            </Link>
                                                        </NavDropdown.Item>
                                                    </DropdownSubmenu>
                                                </NavDropdown.Item>
                                            </NavDropdownMenu>
                                        </>
                                    )
                                }
                            </Nav> */}
          {/* <OverlayTrigger placement="bottom-start" overlay={<Tooltip id={uniqueId()}>Sair</Tooltip>}>
                                <FaDoorOpen style={{ fontSize: '30px', marginRight: '5px', cursor: 'pointer' }} onClick={handlerLogout} />
                            </OverlayTrigger> */}
          {/* {exibeTempoSessao && (
                                    <div style={{ fontSize: '11px' }}>
                                        <span>Sessão:</span>
                                        <br />
                                        {`${tempo}`}
                                    </div>
                                )} */}
          {/* </Container>
                    </Navbar> */}
        </>
      )}
    </>
  );
}

export default NavMenu;
