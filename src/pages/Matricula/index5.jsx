/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Form, Jumbotron } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import FormSelect from '../../component/FormSelect';
import { useMatricula } from '../../context/matricula';
import procedencia from '../../repositories/procedencia.json';
import escolaridade from '../../repositories/escolaridade.json';
import escolaridadeStatus from '../../repositories/escolaridadeSituacao.json';
import anoEnsinoRegular from '../../repositories/ensinoRegular.json';
import educacaoEspecial from '../../repositories/educacaoEspecial.json';
import { ButtonContainer, Buttons, ContainerMultipleColumns, MessageError, Wrapper } from '../styles';

const Matricula5 = () => {
  // Variables
  const history = useHistory();
  const projetos = [
    { id: 1, nome: 'CAIC' },
    { id: 2, nome: 'APAE' },
    { id: 3, nome: 'Nenhum' },
    { id: 4, nome: 'Outros...' },
  ];

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

  // context
  const { matricula, setMatricula } = useMatricula({});

  //  Validations
  const validate = (data) => {
    const {
      tipoMatricula,
      ultimaSerieCursada,
      instrumentoCursado1,
      instrumentoCursado2,
      seriePretendida,
      instrumentoPretendido1,
      instrumentoPretendido2,
      turma,
      turno,
    } = data;
    const erro = {};
    if (tipoMatricula === undefined) {
      const mensagem = 'Tipo de Matrícula deve ser selecionado.';
      erro.tipoMatricula = mensagem;
    }

    return erro;
  };

  const validateIsValid = () => {
    if (matricula.tipoMatricula !== undefined) {
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

  // triggers
  useEffect(() => {
    if (!matricula.nome) {
      history.push('/matricula');
    }
    setProcedenciaOptions(procedencia.map((p) => (
      { value: `9-${p.id}`, label: `${p.nome}` })));
    setEscolaridadeOptions(escolaridade.map((e) => (
      { value: `10-${e.id}`, label: `${e.nome}` })));
    setEscolaridadeStatusOptions(escolaridadeStatus.map((e) => (
      { value: `11-${e.id}`, label: `${e.nome}` })));
    setAnoEnsinoRegularOptions(anoEnsinoRegular.map((a) => (
      { value: `12-${a.id}`, label: `${a.nome}` })));
    setProjetosOptions(projetos.map((p) => (
      { value: `13-${p.id}`, label: `${p.nome}` })));
    setEducacaoEspecialOptions(educacaoEspecial.map((ee) => (
      { value: `14-${ee.id}`, label: `${ee.nome}` })));
  }, []);

  useEffect(() => {
    validateIsValid();
  }, [errors]);

  useEffect(() => {
    if (matricula.tipoMatricula) {
      setErrors(validate(matricula));
    }
  }, [matricula]);

  useEffect(() => {
    validateEscolaridadeStatus();
  }, [matricula.escolaridadeStatus]);

  console.log('Matricula:', matricula);
  console.log('ERROS: ', errors);
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
          <Form>
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
              <Link to="/matricula6">
              <Buttons
                // type="submit"
                variant="success"
                disabled={!isValid}>
                Finalizar
              </Buttons>
              </Link>
    </ButtonContainer>
          </Form>
          </Wrapper>
      </div>
      </>
  ); };

export default Matricula5;
