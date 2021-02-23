/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { FaEdit, FaSistrix } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  FormControl, InputGroup, Jumbotron, OverlayTrigger,
  Tooltip as TooltipBs,
} from 'react-bootstrap';
import { uniqueId } from 'lodash';
import Tables from '../../component/Table';
// import request from '../../services/api';
import { SearchWrapper, FiltroItem, Buttons } from '../styles';

// Table Headers
const headCells = [
  {
    id: 'key', numeric: false, disablePadding: true, label: 'Nº',
  },
  {
    id: 'nome', numeric: false, disablePadding: true, label: 'Nome',
  },
  {
    id: 'usuario', numeric: false, disablePadding: false, label: 'Usuário',
  },
  {
    id: 'email', numeric: true, disablePadding: false, label: 'E-mail',
  },
  {
    id: 'status', numeric: true, disablePadding: false, label: 'Status',
  },
  {
    id: 'acoes', numeric: true, disablePadding: false, label: 'Ações',
  },
];

function ListaUsuario() {
  const urlBd = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/usuarios'
    : 'https://cemliasalgado.herokuapp.com/usuarios';

  // functions
  function replaceSpecialChars(str) {
    return str.normalize('NFD').replace(/[^a-zA-Zs]/g, '');
  }

  function multiSearchOr(text, searchWords) {
    const searchExp = new RegExp(searchWords.join('|'), 'gi');
    return (searchExp.test(text)) ? 'Found!' : 'Not found!';
  }

  function multiSearchAnd(text, searchWords) {
    const searchExp = new RegExp(`(${searchWords.join(')|(')})`, 'gi');
    let resultado = false;
    if (text.match(searchExp) !== null) {
      resultado = (replaceSpecialChars(text).match(searchExp).length === searchWords.length);
    }
    return resultado;
  }

  // Hooks
  const [usuarios, setUsuarios] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [filtro, setFiltro] = useState([]);

  // Handles
  const handleChange = (event) => {
    const { value } = event.target;
    setTimeout(() => {
      setFiltro(value);
    }, 200);
  };

  // Table Rows
  const rows = resultado.map((usuario) => (
    {
      key: usuario.id,
      nome: usuario.nome,
      usuario: usuario.usuario,
      email: usuario.email,
      status: usuario.status,
      acoes:
  <>
    <Tooltip title="Editar">
      <Link to={{ pathname: `/usuario/formulario/${usuario.id}/${usuario.status}` }}>
        <FaEdit className="icone" />
      </Link>
    </Tooltip>
  </>,
    }
  ));

  // Triggers
  useEffect(() => {
    fetch(urlBd)
      .then(async (resp) => {
        const result = await resp.json();
        setUsuarios([...result]);
        setResultado([...result]);
      });
  }, []);

  useEffect(() => {
    if (filtro !== null && filtro !== undefined) {
      const arrayUsuarios = [];
      if (filtro.length >= 3) {
        const filtroPorPalavras = filtro.split(' ');
        const filtraUsuarios = usuarios.map((usuario) => (multiSearchAnd(usuario.usuario, filtroPorPalavras) ? usuario : ''));
        filtraUsuarios.map((usuario) => {
          if (usuario !== '') {
            arrayUsuarios.push(usuario);
          }
          return null;
        });
        if (filtroPorPalavras.length > 1) {
          setResultado([...arrayUsuarios]);
        } else {
          const filtrado = usuarios.filter((usuario) => (
            replaceSpecialChars(usuario.usuario).toLowerCase()
              .includes(replaceSpecialChars(filtro).toLowerCase())));
          setResultado([...filtrado]);
        }
      }
      if (filtro.length === 0) {
        setResultado([...usuarios]);
      }
    }
  }, [filtro, usuarios]);

  return (
    <>
      <div className="root">
        <Jumbotron className="jumbotron">
          <h2>Lista de Usuários.</h2>
          <span>
            Usuários com acesso ao sistema.
          </span>
        </Jumbotron>
        <SearchWrapper>

          <Link to="/usuario/formulario">
            <Buttons variant="warning" className="btn btn-warning">Cadastrar Novo Usuário</Buttons>
          </Link>

          <OverlayTrigger placement="auto" overlay={<TooltipBs id={uniqueId()}>Filtrar por Nome</TooltipBs>}>
            <FiltroItem style={{ padding: '0', height: 'auto' }}>
              <InputGroup size="lg">
                <FormControl className="searchInputItens" onChange={handleChange} />
                <InputGroup.Append>
                  <InputGroup.Text
                    style={{
                      backgroundColor: '#ecc085',
                      borderLeftColor: '#ecbf85',
                    }}
                  >
                    <FaSistrix style={{ fontSize: '18px' }} />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </FiltroItem>
          </OverlayTrigger>
        </SearchWrapper>
        <div className="divider" />
        <Tables headCells={headCells} rows={rows} collapsable={false} />
      </div>
    </>
  );
}

export default ListaUsuario;
