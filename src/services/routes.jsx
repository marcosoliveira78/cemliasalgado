/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './auth';
import PaginaNaoEncontrada from '../pages/PageNotFound';
import ListagemGeral from '../pages/ListagemGeral';
import Matricula from '../pages/Matricula';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (Auth.isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))}
  />
);

const PrivateRouteLogged = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (!Auth.isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/Home', state: { from: props.location } }} />
    ))}
  />
);

const AdminPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (Auth.isAuthenticated() && Auth.getUserLogged().isAdmin ? (
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
    <PrivateRouteLogged exact path="/" component={ListagemGeral} />
    <Route exact path="/listagemGeral" component={ListagemGeral} />
    <Route exact path="/matricula" component={Matricula} />
    <Route component={PaginaNaoEncontrada} />
  </Switch>
);

export default Routes;
