/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Form, Jumbotron, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { uniqueId } from 'lodash';
import FormSelect from '../../component/FormSelect';
import { useMatricula } from '../../context/matricula';
import listaProcedencias from '../../repositories/procedencia.json';
import listaEscolaridades from '../../repositories/escolaridade.json';
import listaEscolaridadesStatus from '../../repositories/escolaridadeSituacao.json';
import listaAnosEnsinoRegular from '../../repositories/ensinoRegular.json';
import listaEducacaoEspecial from '../../repositories/educacaoEspecial.json';
import listaProjetos from '../../repositories/projetos.json';
import { ButtonContainer, Buttons, ContainerMultipleColumns, MessageError, Wrapper } from '../styles';
import ShowMessage from '../../services/toast';
import convertDate from '../../component/Convert/Date';
import { Label } from '../../component/FormSelect/styles';
import Confirmacao from './confirmacao';
// import Modal from '../../component/Modal';

const Matricula5 = () => {
  // Variables
  const urlBd = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://cemliasalgado.herokuapp.com';
  const pasta = 'matriculas';
  const history = useHistory();
  let nextId;
  const now = new Date();

  // hooks
  const [isValid, setIsValid] = useState(false);
  const [isEscolaridadeIncompleta, setIsEscolaridadeIncompleta] = useState(false);
  const [errors, setErrors] = useState({});
  const [procedenciaOptions, setProcedenciaOptions] = useState([]);
  const [escolaridadeOptions, setEscolaridadeOptions] = useState([]);
  const [escolaridadeStatusOptions, setEscolaridadeStatusOptions] = useState([]);
  const [anoEnsinoRegularOptions, setAnoEnsinoRegularOptions] = useState([]);
  const [projetosOptions, setProjetosOptions] = useState([]);
  const [educacaoEspecialOptions, setEducacaoEspecialOptions] = useState([]);
  const [show, setShow] = useState(false);

  const dataAtual = convertDate(now);
  // context
  const { matricula, setMatricula } = useMatricula({});

  //  Validations
  const validate = (data) => {
    const {
      procedencia,
      escolaridade,
      escolaridadeStatus,
      anoEnsinoRegular,
      projeto,
      educacaoEspecial,
    } = data;
    const erro = {};
    if (procedencia === undefined) {
      const mensagem = 'Procedência do Aluno deve ser selecionada.';
      erro.procedencia = mensagem;
    }
    if (escolaridade === undefined) {
      const mensagem = 'Escolaridade do Aluno deve ser selecionada.';
      erro.escolaridade = mensagem;
    }
    if (escolaridadeStatus === undefined) {
      const mensagem = 'Situação escolar do Aluno deve ser selecionada.';
      erro.escolaridadeStatus = mensagem;
    }
    if (escolaridadeStatus !== undefined && parseInt(matricula.codigoEscolaridadeStatus.split('-')[1], 10) > 1) {
      if (anoEnsinoRegular === undefined || anoEnsinoRegular === '') {
        const mensagem = 'Ano que cursará deve ser selecionado.';
        erro.anoEnsinoRegular = mensagem;
      }
    } else if (escolaridadeStatus !== undefined && parseInt(matricula.codigoEscolaridadeStatus.split('-')[1], 10) === 1) {
      matricula.codigoAnoEnsinoRegular = '';
      matricula.anoEnsinoRegular = '';
    }
    if (projeto === undefined) {
      const mensagem = 'Selecione uma opção';
      erro.projeto = mensagem;
    }
    if (educacaoEspecial === undefined) {
      const mensagem = 'Selecione uma opção.';
      erro.educacaoEspecial = mensagem;
    }

    return erro;
  };

  const validateIsValid = () => {
    if (matricula.procedencia !== undefined) {
      if (Object.keys(errors).length === 0) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  };

  const validateEscolaridadeStatus = () => {
    switch (matricula.escolaridadeStatus) {
      case 'Incompleto':
      case 'Cursando':
        setIsEscolaridadeIncompleta(true);
        break;
      default:
        setIsEscolaridadeIncompleta(false);
        break;
    }
  };

  // handles
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMatricula({ ...matricula, [name]: value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeSelect = (event) => {
    const { value, label } = event;
    let tipo;
    if (value.split('-')[0].toString() === '9') tipo = 'procedencia';
    if (value.split('-')[0].toString() === '10') tipo = 'escolaridade';
    if (value.split('-')[0].toString() === '11') tipo = 'escolaridadeStatus';
    if (value.split('-')[0].toString() === '12') tipo = 'anoEnsinoRegular';
    if (value.split('-')[0].toString() === '13') tipo = 'projeto';
    if (value.split('-')[0].toString() === '14') tipo = 'educacaoEspecial';
    switch (tipo) {
      case 'procedencia':
        setMatricula({ ...matricula, procedencia: label, codigoProcedencia: value });
        break;
      case 'escolaridade':
        setMatricula({ ...matricula, escolaridade: label, codigoEscolaridade: value });
        break;
      case 'escolaridadeStatus':
        setMatricula({ ...matricula, escolaridadeStatus: label, codigoEscolaridadeStatus: value });
        break;
      case 'anoEnsinoRegular':
        setMatricula({ ...matricula, anoEnsinoRegular: label, codigoAnoEnsinoRegular: value });
        break;
      case 'projeto':
        setMatricula({ ...matricula, projeto: label, codigoProjeto: value });
        break;
      case 'educacaoEspecial':
        setMatricula({ ...matricula, educacaoEspecial: label, codigoEducacaoEspecial: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (form) => {
    form.preventDefault();
    const json = JSON.stringify({
      dataHora: dataAtual,
      id: nextId,
      status: 'A',
      nome: matricula.nome,
      email: matricula.email,
      cpf: matricula.cpf,
      telefonePrincipal: matricula.telefonePrincipal,
      telefoneSecundario: matricula.telefoneSecundario,
      dataNascimento: matricula.dataNascimento,
      idadeEscolar: matricula.idadeEscolar,
      genero: matricula.genero,
      nacionalidade: matricula.nacionalidade,
      naturalidade: matricula.naturalidade,
      codigoNaturalidade: matricula.codigoNaturalidade,
      naturalidadeUF: matricula.naturalidadeUF,
      codigoNaturalidadeUF: matricula.codigoNaturalidadeUF,
      nomeMae: matricula.nomeMae,
      nomePai: matricula.nomePai,
      responsavel: matricula.responsavel,
      grauParentesco: matricula.grauParentesco,
      cep: matricula.cep,
      logradouro: matricula.logradouro,
      numero: matricula.numero,
      complemento: matricula.complemento,
      bairro: matricula.bairro,
      uf: matricula.uf,
      codigoUf: matricula.codigoUf,
      municipio: matricula.municipio,
      codigoMunicipio: matricula.codigoMunicipio,
      distrito: matricula.distrito,
      codigoDistrito: matricula.codigoDistrito,
      tipoMatricula: matricula.tipoMatricula,
      codigoTipoMatricula: matricula.codigoTipoMatricula,
      ultimaSerieCursada: matricula.ultimaSerieCursada,
      codigoUltimaSerieCursada: matricula.codigoUltimaSerieCursada,
      instrumentoCursado1: matricula.instrumentoCursado1,
      codigoInstrumentoCursado1: matricula.codigoInstrumentoCursado1,
      instrumentoCursado2: matricula.instrumentoCursado2,
      codigoInstrumentoCursado2: matricula.codigoInstrumentoCursado2,
      seriePretendida: matricula.seriePretendida,
      codigoSeriePretendida: matricula.codigoSeriePretendida,
      instrumentoPretendido1: matricula.instrumentoPretendido1,
      codigoInstrumentoPretendido1: matricula.codigoInstrumentoPretendido1,
      instrumentoPretendido2: matricula.instrumentoPretendido2,
      codigoInstrumentoPretendido2: matricula.codigoInstrumentoPretendido2,
      turma: matricula.turma,
      codigoTurma: matricula.codigoTurma,
      turno: matricula.turno,
      codigoTurno: matricula.codigoTurno,
      procedencia: matricula.procedencia,
      codigoProcedencia: matricula.codigoProcedencia,
      escolaridade: matricula.escolaridade,
      codigoEscolaridade: matricula.codigoEscolaridade,
      escolaridadeStatus: matricula.escolaridadeStatus,
      codigoEscolaridadeStatus: matricula.codigoEscolaridadeStatus,
      anoEnsinoRegular: matricula.anoEnsinoRegular,
      codigoAnoEnsinoRegular: matricula.codigoAnoEnsinoRegular,
      projeto: matricula.projeto,
      codigoProjeto: matricula.codigoProjeto,
      educacaoEspecial: matricula.educacaoEspecial,
      codigoEducacaoEspecial: matricula.codigoEducacaoEspecial,
    });
    console.log('MATRICULA FINAL:', JSON.parse(json));

    // fetch(`${urlBd}/${pasta}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     mode: 'cors',
    //     cache: 'default',
    //     body: json,
    //   })
    //   .then(async (resp) => {
    //     if (resp.ok) {
    //       ShowMessage('success', 'Cadastro efetuado com sucesso', 5000, uniqueId());
    //       setMatricula('');
    //       history.push('/listagemGeral');
    //     }
    //   });
  };

  // triggers
  useEffect(() => {
    if (!matricula.nome) {
      history.push('/matricula');
    }
    setProcedenciaOptions(listaProcedencias.map((p) => (
      { value: `9-${p.id}`, label: `${p.nome}` })));
    setEscolaridadeOptions(listaEscolaridades.map((e) => (
      { value: `10-${e.id}`, label: `${e.nome}` })));
    setEscolaridadeStatusOptions(listaEscolaridadesStatus.map((e) => (
      { value: `11-${e.id}`, label: `${e.nome}` })));
    setAnoEnsinoRegularOptions(listaAnosEnsinoRegular.map((a) => (
      { value: `12-${a.id}`, label: `${a.nome}` })));
    setProjetosOptions(listaProjetos.map((p) => (
      { value: `13-${p.id}`, label: `${p.nome}` })));
    setEducacaoEspecialOptions(listaEducacaoEspecial.map((ee) => (
      { value: `14-${ee.id}`, label: `${ee.nome}` })));
    fetch(`${urlBd}/${pasta}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'default',
      })
      .then(async (resp) => {
        const resultado = await resp.json();
        const lastKey = Object.keys(resultado).reverse()[0];
        nextId = resultado[lastKey].id + 1;
      });
  }, []);

  useEffect(() => {
    validateIsValid();
  }, [errors]);

  useEffect(() => {
    // if (matricula.procedencia) {
    setErrors(validate(matricula));
    // }
  }, [matricula]);

  useEffect(() => {
    validateEscolaridadeStatus();
  }, [matricula.escolaridadeStatus]);

  // console.log('Página 5', matricula);
  // console.log('ERROS:', errors);

  const confirmacaoMatricula = () => (
  <>
  <Label> Nome: </Label>
  <Label>{matricula.nome}</Label>
  </>
  );

  return (
      <>
      <div className="root">
          <Jumbotron className="jumbotron">
            <h2>Matrícula de Alunos</h2>
            <span>Dados Escolares (Ensino Regular)</span>
            {/* <span>Formulário de preenchimento de Matrícula.</span> */}
          </Jumbotron>
          <div className="divider" />
          <Wrapper>
          <Form onSubmit={handleSubmit}>
          <FormSelect
            id="1"
            label="Procedência do Aluno:"
            name="procedencia"
            value={matricula.codigoProcedencia}
            onChange={handleChangeSelect}
            options={procedenciaOptions}
            />
            {errors.procedencia && <MessageError>{errors.procedencia}</MessageError>}
        <ContainerMultipleColumns>
       <div style={{ width: '100%', margin: '0 5px 0 0' }}>
       <FormSelect
       id="2"
       label="Escolaridade do Aluno:"
       name="escolaridade"
       value={matricula.codigoEscolaridade}
       onChange={handleChangeSelect}
       options={escolaridadeOptions}
       />
       {errors.escolaridade && <MessageError>{errors.escolaridade}</MessageError>}
       </div>
       <div style={{ width: '90%', margin: '0' }}>
       <FormSelect
       id="3"
       label="Situaçao:"
       name="escolaridadeStatus"
       value={matricula.codigoEscolaridadeStatus}
       onChange={handleChangeSelect}
       options={escolaridadeStatusOptions}
       />
       {errors.escolaridadeStatus && <MessageError>{errors.escolaridadeStatus}</MessageError>}
       </div>
       { matricula.escolaridadeStatus
       && isEscolaridadeIncompleta && (
       <div style={{ width: '95%', margin: '0 0 0 5px' }}>
        <FormSelect
        id="4"
        label="Ano a ser cursado:"
        name="anoEnsinoRegular"
        value={matricula.codigoAnoEnsinoRegular}
        onChange={handleChangeSelect}
        options={anoEnsinoRegularOptions}
        />
        {errors.anoEnsinoRegular && <MessageError>{errors.anoEnsinoRegular}</MessageError>}
       </div>
       )}
        </ContainerMultipleColumns>
        <ContainerMultipleColumns>
       <div style={{ width: '100%', margin: '0 5px 0 0' }}>
       <FormSelect
       id="2"
       label="Projetos:"
       name="projeto"
       value={matricula.codigoProjeto}
       onChange={handleChangeSelect}
       options={projetosOptions}
       />
       {errors.projeto && <MessageError>{errors.projeto}</MessageError>}
       </div>
       <div style={{ width: '95%', margin: '0 0 0 5px' }}>
        <FormSelect
        id="4"
        label="Educação Especial:"
        name="educacaoEspecial"
        value={matricula.codigoEducacaoEspecial}
        onChange={handleChangeSelect}
        options={educacaoEspecialOptions}
        />
        {errors.educacaoEspecial && <MessageError>{errors.educacaoEspecial}</MessageError>}
       </div>
        </ContainerMultipleColumns>
    <ButtonContainer>
              <Link to="/matricula4">
                <Buttons variant="danger"> Voltar </Buttons>
              </Link>
              <Buttons
                onClick={handleShow}
                // type="submit"
                variant="success"
                disabled={!isValid}>
                Finalizar
              </Buttons>
    </ButtonContainer>

    {/* MODAL DE Confirmação */}
    <Modal
      dialogClassName="modal-95w"
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
      show={show}
      onHide={handleClose}>
              <Modal.Header className="modalHeader" closeButton>
                <Modal.Title className="modalTitle">Confirmação dos dados de Matrícula</Modal.Title>
                {/* <Modal.Label> Teste </Modal.Label> */}
              </Modal.Header>
              <Modal.Body>
              <Confirmacao />
              </Modal.Body>
              <Modal.Footer>
                <Buttons variant="danger" onClick={handleClose}>Fechar</Buttons>
                <Buttons variant="success" value="imagem" onClick={handleClose}> Confirmar </Buttons>
              </Modal.Footer>
    </Modal>

          </Form>
          </Wrapper>
      </div>
      </>
  ); };

export default Matricula5;
