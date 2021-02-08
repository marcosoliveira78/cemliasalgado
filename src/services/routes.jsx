/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isAuthenticated, getUserLogged } from './auth';
import PaginaNaoEncontrada from '../pages/PageNotFound';
import Login from '../pages/Login';
import ListagemGeral from '../pages/ListagemGeral';
import Matricula from '../pages/Matricula';
import Matricula2 from '../pages/Matricula/index2';
import Matricula3 from '../pages/Matricula/index3';
import Matricula4 from '../pages/Matricula/index4';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))}
  />
);

const PrivateRouteLogged = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (!isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/Home', state: { from: props.location } }} />
    ))}
  />
);

const AdminPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() && getUserLogged().isAdmin ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/Home', state: { from: props.location } }} />
    ))}
  />
);

const Routes = () => (
  <Switch>
    {/* <PrivateRouteLogged exact path="/" component={Login} />
        <PrivateRoute exact path="/Home" component={Home} />
        <PrivateRoute exact path="/Contato" component={Contato} />
        <PrivateRoute exact path="/Home/:tipoSolicitacao" component={Home} />
        <PrivateRoute exact path="/Iframe" component={Iframe} />
        <PrivateRoute exact path="/Upload/Imagens" component={UploadImage} />
        <PrivateRoute exact path="/Upload/Background" component={UploadBackground} />
        <PrivateRoute exact path="/Chamados" component={Chamados} />
        <AdminPrivateRoute exact path="/Grupo/Cadastrar" component={CadastroGrupo} />
        <AdminPrivateRoute exact path="/Item/Cadastrar" component={CadastroItem} />
        <AdminPrivateRoute exact path="/Grupo/Consultar" component={ConsultaGrupo} />
        <AdminPrivateRoute exact path="/Item/Consultar" component={ConsultaItem} />
        <AdminPrivateRoute name="editGroup" exact path="/Grupo/Editar/:codigoGrupo/:status" component={EditaGrupo} />
        <AdminPrivateRoute name="editItem" exact path="/Item/Editar/:codigoItem/:codigoGrupo/:status" component={EditaItem} />
        <AdminPrivateRoute exatc path="/Backgrounds" component={Background} /> */}
    <Route exact path="/" component={Login} />
    <PrivateRoute exact path="/listagemGeral" component={ListagemGeral} />
    <PrivateRoute exact path="/matricula" component={Matricula} />
    <PrivateRoute exact path="/matricula2" component={Matricula2} />
    <PrivateRoute exact path="/matricula3" component={Matricula3} />
    <PrivateRoute exact path="/matricula4" component={Matricula4} />
    <PrivateRoute component={PaginaNaoEncontrada} />
  </Switch>
);

export default Routes;
