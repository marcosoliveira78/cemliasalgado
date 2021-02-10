/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { FaEdit, FaSistrix } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  FormControl, InputGroup, Jumbotron, OverlayTrigger, Tooltip as TooltipBs,
} from 'react-bootstrap';
import { uniqueId } from 'lodash';
import Tables from '../../component/Table';
import request from '../../services/api';
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
    id: 'telefonePrincipal', numeric: false, disablePadding: false, label: 'Telefone',
  },
  {
    id: 'educacaoMusical', numeric: true, disablePadding: false, label: 'Educação Musical',
  },
  {
    id: 'educacaoTecnica', numeric: true, disablePadding: false, label: 'Educação Técnica',
  },
  {
    id: 'instrumento', numeric: true, disablePadding: false, label: 'Instrumento',
  },
  {
    id: 'instrumento2', numeric: true, disablePadding: false, label: 'Instrumento 2',
  },
  {
    id: 'status', numeric: true, disablePadding: false, label: 'Status',
  },
  {
    id: 'acoes', numeric: true, disablePadding: false, label: 'Ações',
  },
];

function ListagemGeral() {
  const urlBd = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/Matriculas'
    : 'https://cemliasalgado.herokuapp.com/matriculas';

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
  const [matriculas, setMatriculas] = useState([]);
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
  const rows = resultado.map((matricula) => (
    {
      key: matricula.id,
      // dataHora: matricula.dataHora,
      nome: matricula.nome,
      // cpf: matricula.cpf,
      // dataNascimento: matricula.dataNascimento,
      // genero: matricula.genero,
      // nacionalidade: matricula.nacionalidade,
      // naturalidade: matricula.naturalidade,
      // naturalidadeUf: matricula.naturalidadeUf,
      // nomePai: matricula.nomePai,
      // nomeMae: matricula.nomeMae,
      // responsavel: matricula.responsavel,
      // grauParentesco: matricula.grauParentesco,
      telefonePrincipal: matricula.telefonePrincipal,
      // telefoneSecundario: matricula.telefoneSecundario,
      // email: matricula.email,
      // logradouro: matricula.logradouro,
      // numero: matricula.numero,
      // bairro: matricula.bairro,
      // distrito: matricula.distrito,
      // municipio: matricula.municipio,
      // uf: matricula.uf,
      // cep: matricula.cep,
      // tipoMatricula: matricula.tipoMatricula,
      // ultimaSerieCursada: matricula.ultimaSerieCursada,
      // instrumentoCursado1: matricula.instrumentoCursado1,
      // instrumentoCursado2: matricula.instrumentoCursado2,
      educacaoMusical: matricula.educacaoMusical,
      educacaoTecnica: matricula.educacaoTecnica,
      instrumento: matricula.instrumento,
      instrumento2: matricula.instrumento2,
      // turma: matricula.turma,
      // turno: matricula.turno,
      // procedencia: matricula.procedencia,
      // escolaridade: matricula.escolaridade,
      // projeto: matricula.projeto,
      // educacaoEspecial: matricula.educacaoEspecial,
      // confirmacaoDesejoMatricula: matricula.confirmacaoDesejoMatricula,
      // AnoaSerCursado: matricula.AnoaSerCursado,
      status: 'A',
      acoes:
  <>
    <Tooltip title="Editar">
      <Link to={{ pathname: `/Matricula/Editar/${matricula.id}` }}>
        <FaEdit className="icone" />
      </Link>
    </Tooltip>
  </>,
    }
  ));

  // Triggers
  useEffect(() => {
    // request('get', 'matriculas')
    fetch(urlBd)
      .then(async (resp) => {
        const result = await resp.json();
        setMatriculas([...result]);
        setResultado([...result]);
      });
  }, []);

  useEffect(() => {
    if (filtro !== null && filtro !== undefined) {
      const arrayMatriculas = [];
      if (filtro.length >= 3) {
        const filtroPorPalavras = filtro.split(' ');
        const filtraMatriculas = matriculas.map((matricula) => (multiSearchAnd(matricula.nome, filtroPorPalavras) ? matricula : ''));
        filtraMatriculas.map((matricula) => {
          if (matricula !== '') {
            arrayMatriculas.push(matricula);
          }
          return null;
        });
        if (filtroPorPalavras.length > 1) {
          setResultado([...arrayMatriculas]);
        } else {
          const filtrado = matriculas.filter((matricula) => (
            replaceSpecialChars(matricula.nome).toLowerCase()
              .includes(replaceSpecialChars(filtro).toLowerCase())));
          setResultado([...filtrado]);
        }
      }
      if (filtro.length === 0) {
        setResultado([...matriculas]);
      }
    }
  }, [filtro, matriculas]);

  return (
    <>
      <div className="root">
        <Jumbotron className="jumbotron">
          <h2>Listagem de Alunos</h2>
          <span>
            Alunos que preencheram o formulário de matrícula.
          </span>
        </Jumbotron>
        <SearchWrapper>

          <Link to="/matricula">
            <Buttons variant="warning" className="btn btn-info">Cadastrar Aluno</Buttons>
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

export default ListagemGeral;
