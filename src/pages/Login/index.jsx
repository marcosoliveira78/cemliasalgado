/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Container, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { uniqueId } from 'lodash';
import login from '../../assets/image/login.png';
import logo from '../../assets/image/LiaSalgado.png';
import CustomSpinner from '../../component/Spinner';
import { useLogin } from '../../context/Login';
import ShowMessage from '../../services/toast';
import { Buttons } from '../styles';
import './styles.css';

const Login = () => {
  // Hooks
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [spinnerShow, setSpinnerShow] = useState(false);
  const { setLogin } = useLogin(false);
  const { setAdmin } = useLogin(false);

  // Variables
  const history = useHistory();

  // Functions
  const validateForm = () => user.length > 0 && password.length > 0;

  // Handles
  const handleSubmit = async (form) => {
    form.preventDefault();
    localStorage.LOGOUT = '';
    setSpinnerShow(true);
    const newLogin = {
      user,
      pass: password,
    };

    // const response = await loginRep.IntegracaoEllevoLogin(newLogin);

    // if (response !== null && response.sessionID !== undefined && response.sessionID !== '') {
    //   Auth.login(response);
    if (newLogin.user === 'mso10' && newLogin.pass === '123456') {
      setLogin(true);
      //   setAdmin(response.isAdmin);
      history.push('/Home');
    } else {
      ShowMessage('error', 'Erro ao realizar login. Verifique seus dados e novamente.');
      setSpinnerShow(false);
    }
  };

  useEffect(() => {
    if (localStorage.LOGOUT === 'expireSession') {
      ShowMessage('info', 'Sua sessão expirou. Realize o login novamente.', 10000);
      localStorage.LOGOUT = '';
    }
  }, []);
  return (
    <>
    <div className="Login" />
    <CustomSpinner show={spinnerShow} onHide={() => setSpinnerShow(false)} />
    <Container style={{ maxWidth: '400px' }} fluid="md">
        <Form onSubmit={handleSubmit}>
          <div className="content-form-login">
            <div className="logo">
              <OverlayTrigger placement="auto" overlay={<Tooltip id={uniqueId()}>CEM Lia Salgado</Tooltip>}>
                <img src={logo} alt="Login" className="logo-form-menu" />
              </OverlayTrigger>
            </div>
            <div className="flexRow">
              <FaUserCircle className="icon-form-menu" />
            </div>
            <div className="flexRow">
              <img src={login} alt="Login" className="login-form-menu" />
            </div>
            <Form.Group size="lg" controlId="user">
              <Form.Control
                autoFocus
                type="text"
                value={user}
                placeholder="Usu&aacute;rio"
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Control
                type="password"
                value={password}
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Buttons style={{ border: 0, backgroundColor: '#cf8c34', color: '#fff' }} variant="warning" block size="lg" type="submit" disabled={!validateForm()}>
              Entrar
            </Buttons>
          </div>
        </Form>
    </Container>
    </>
  ); };

export default Login;
