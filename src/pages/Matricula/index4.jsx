/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Form, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormSelect from '../../component/FormSelect';
import { useMatricula } from '../../context/matricula';
import series from '../../repositories/series.json';
import instrumentos from '../../repositories/instrumentos.json';
import turma from '../../repositories/turma.json';
import { ButtonContainer, Buttons, ContainerMultipleColumns, Wrapper } from '../styles';
import { calculaIdadeEscolar } from '../../component/Convert/Idade';

const Matricula4 = () => {
  // variables
  const tiposMatricula = [
    { value: 1, label: 'Matricula (Primeira matrícula, para quem nunca estudou no Conservatório)' },
    { value: 2, label: 'Re-Matricula (Aluno que já estudou no Conservatório, mas ficou algum tempo afastado' },
    { value: 3, label: 'Renovação (Aluno que estudou em 2020)' },
  ];

  const turno = [
    { id: 1, nome: 'Manhã' },
    { id: 2, nome: 'Tarde' },
    { id: 3, nome: 'Noite' },
  ];

  // hooks
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [tipoMatriculaOptions, setTipoMatriculaOptions] = useState([]);
  const [serieCursadaOptions, setSerieCursadaOptions] = useState([]);
  const [seriePretendidaOptions, setSeriePretendidaOptions] = useState([]);
  const [instrumentoCursado1Options, setInstrumentoCursado1Options] = useState([]);
  const [instrumentoCursado2Options, setInstrumentoCursado2Options] = useState([]);
  const [instrumentoPretendido1Options, setInstrumentoPretendido1Options] = useState([]);
  const [instrumentoPretendido2Options, setInstrumentoPretendido2Options] = useState([]);
  const [isInstrumentoPretendido2Disabled, setIsInstrumentoPretendido2Disabled] = useState(false);
  const [turmaOptions, setTurmaOptions] = useState([]);
  const [turnoOptions, setTurnoOptions] = useState([]);

  // context
  const { matricula, setMatricula } = useMatricula({});

  //  Validations
  const validate = (data) => {
    const {
      cep,
      logradouro,
      numero,
      bairro,
      municipio,
      uf,
    } = data;
    const erro = {};
    return erro;
  };

  const validateIsValid = () => {
    if (Object.keys(errors).length === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
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
    // if (value > 100 && value <= 103) tipo = 'tipoMatricula';
    if (value[0].split('-').toString() === '0') tipo = 'tipoMatricula';
    if (value[0].split('-').toString() === '1') tipo = 'ultimaSerieCursada';
    if (value[0].split('-').toString() === '2') tipo = 'seriePretendida';
    if (value[0].split('-').toString() === '3') tipo = 'instrumentoCursado1';
    if (value[0].split('-').toString() === '4') tipo = 'instrumentoCursado2';
    if (value[0].split('-').toString() === '5') tipo = 'instrumentoPretendido1';
    if (value[0].split('-').toString() === '6') tipo = 'instrumentoPretendido2';
    if (value[0].split('-').toString() === '7') tipo = 'turma';
    if (value[0].split('-').toString() === '8') tipo = 'turno';
    // if (value.toString().length === 9) tipo = 'codigoDistrito';
    switch (tipo) {
      case 'tipoMatricula':
        setMatricula({ ...matricula, tipoMatricula: label, codigoTipoMatricula: value });
        break;
      case 'ultimaSerieCursada':
        setMatricula({ ...matricula, ultimaSerieCursada: label, codigoUltimaSerieCursada: value });
        break;
      case 'instrumentoCursado1':
        setMatricula({ ...matricula, instrumentoCursado1: label, codigoInstrumentoCursado1: value });
        break;
      case 'instrumentoCursado2':
        setMatricula({ ...matricula, instrumentoCursado2: label, codigoInstrumentoCursado2: value });
        break;
      case 'seriePretendida':
        setMatricula({ ...matricula, seriePretendida: label, codigoSeriePretendida: value });
        break;
      case 'instrumentoPretendido1':
        setMatricula({ ...matricula, instrumentoPretendido1: label, codigoInstrumentoPretendido1: value });
        break;
      case 'instrumentoPretendido2':
        setMatricula({ ...matricula, instrumentoPretendido2: label, codigoInstrumentoPretendido2: value });
        break;
      case 'turma':
        setMatricula({ ...matricula, turma: label, codigoTurma: value });
        break;
      case 'turno':
        setMatricula({ ...matricula, turno: label, codigoTurno: value });
        break;
      default:
        break;
    }
  };

  // Functions
  const clearTipoMatricula = () => {
    matricula.ultimaSerieCursada = '';
    matricula.codigoUltimaSerieCursada = '';
    matricula.seriePretendida = '';
    matricula.codigoSeriePretendida = '';
    matricula.instrumentoCursado1 = '';
    matricula.instrumentoCursado2 = '';
    matricula.instrumentoPretendido1 = '';
    matricula.instrumentoPretendido2 = '';
    matricula.codigoInstrumentoCursado1 = '';
    matricula.codigoInstrumentoCursado2 = '';
    matricula.codigoInstrumentoPretendido1 = '';
    matricula.codigoInstrumentoPretendido2 = '';
    matricula.turma = '';
  };

  const changeSelectInstrumento = (codigoSerie, serie, codigoInstrumento, instrumentoPretendido) => {
    matricula.codigoSeriePretendida = codigoSerie;
    matricula.seriePretendida = serie;
    matricula.codigoInstrumentoPretendido2 = codigoInstrumento;
    matricula.instrumentoPretendido2 = instrumentoPretendido;
    setIsInstrumentoPretendido2Disabled(true);
    setInstrumentoPretendido2Options(instrumentos.map((instrumento) => {
      let disabled = 'yes';
      if (instrumento.nome.toLocaleLowerCase() === instrumentoPretendido.toLocaleLowerCase()) disabled = 'no';
      return (
        { value: `6-${instrumento.id}`, label: `${instrumento.nome}`, disabled });
    }));
  };

  // const calculaIdade = (dataAniversario) => {
  //   const d = new Date();
  //   const anoAtual = d.getFullYear();
  //   const mesAtual = d.getMonth() + 1;
  //   const diaAtual = d.getDate();

  //   const newDate = dataAniversario.split('/');

  //   const diaAniversario = parseInt(newDate[0].toString(), 10);
  //   const mesAniversario = parseInt(newDate[1].toString(), 10);
  //   const anoAniversario = parseInt(newDate[2].toString(), 10);

  //   let quantosAnos = anoAtual - anoAniversario;

  //   if ((mesAtual < mesAniversario || mesAtual === mesAniversario) && diaAtual < diaAniversario) {
  //     quantosAnos--;
  //   }
  //   return quantosAnos < 0 ? 0 : quantosAnos;
  // };

  // triggers
  useEffect(() => {
    setTipoMatriculaOptions(tiposMatricula.map((tipo) => (
      { value: `0-${tipo.value}`, label: `${tipo.label}` }
    )));
    if (matricula.dataNascimento !== undefined) {
      console.log('IDADE: ', calculaIdadeEscolar(matricula.dataNascimento));
    }
  }, []);

  useEffect(() => {
    validateIsValid();
  }, [errors]);

  useEffect(() => {
    if (matricula.dataHora) {
      setErrors(validate(matricula));
    }
  }, [matricula]);

  useEffect(() => {
    clearTipoMatricula();
    setSerieCursadaOptions(series.map((serie) => (
      { value: `1-${serie.id}`, label: `${serie.nome}` })));
    setSeriePretendidaOptions(series.map((serie) => (
      { value: `2-${serie.id}`, label: `${serie.nome}` })));
    setInstrumentoCursado1Options(instrumentos.map((instrumento) => (
      { value: `3-${instrumento.id}`, label: `${instrumento.nome}` })));
    setInstrumentoCursado2Options(instrumentos.map((instrumento) => (
      { value: `4-${instrumento.id}`, label: `${instrumento.nome}` })));
    setInstrumentoPretendido1Options(instrumentos.map((instrumento) => (
      { value: `5-${instrumento.id}`, label: `${instrumento.nome}` })));
    setInstrumentoPretendido2Options(instrumentos.map((instrumento) => {
      let disabled = 'no';
      if (instrumento.nome.toLocaleLowerCase() === 'canto (à partir 14 anos)') disabled = 'yes';
      return (
        { value: `6-${instrumento.id}`, label: `${instrumento.nome}`, disabled });
    }));
    setTurmaOptions(turma.map((idade) => (
      { value: `7-${idade.id}`, label: `${idade.nome}` })));
    setTurnoOptions(turno.map((t) => (
      { value: `8-${t.id}`, label: `${t.nome}` })));
  }, [matricula.tipoMatricula]);

  useEffect(() => {
    if (matricula.codigoSeriePretendida !== undefined) {
      const serie = parseInt(matricula.codigoSeriePretendida.replace('-', ''), 10);
      if (matricula.codigoInstrumentoPretendido1 === '5-202') {
        switch (serie) {
          case 21:
          case 22:
          case 23:
          case 24:
            changeSelectInstrumento('2-4', '4º INTERMEDIÁRIO', '6-210', 'VIOLÃO (à partir 6 anos)');
            break;
          case 25:
            changeSelectInstrumento('2-5', '5º INTERMEDIÁRIO', '6-209', 'TECLADO (à partir 6 anos)');
            break;
          case 26:
            changeSelectInstrumento('2-6', '6º INTERMEDIÁRIO', '6-207', 'PIANO (à partir 6 anos)');
            break;
          default:
            matricula.codigoInstrumentoPretendido2 = '';
            matricula.instrumentoPretendido2 = '';
            break;
        }
      } else
      if (matricula.codigoInstrumentoPretendido1 !== '5-202'
      ) {
        setIsInstrumentoPretendido2Disabled(false);
        setInstrumentoPretendido2Options(instrumentos.map((instrumento) => {
          let disabled = 'no';
          if (instrumento.nome.toLocaleLowerCase() === 'canto (à partir 14 anos)') disabled = 'yes';
          return (
            { value: `6-${instrumento.id}`, label: `${instrumento.nome}`, disabled });
        }));
      }
    }
  }, [matricula.codigoInstrumentoPretendido1, matricula.seriePretendida]);

  console.log('Matricula:', matricula);
  return (
    <>
    <div className="root">
        <Jumbotron className="jumbotron">
          <h2>Matrícula de Alunos</h2>
          <span>Formulário de preenchimento de Matrícula.</span>
        </Jumbotron>
        <div className="divider" />
        <Wrapper>
        <Form>
        <FormSelect
              label="Tipo de Matrícula:"
              name="tipoMatricula"
              value={matricula.codigoTipoMatricula}
              onChange={handleChangeSelect}
              options={tipoMatriculaOptions}
            />
            {matricula.codigoTipoMatricula
            && matricula.codigoTipoMatricula.toString() !== '0-1'
            && (
              <ContainerMultipleColumns>
                <div style={{ width: '100%', margin: '0 5px 0 0' }}>
                  <FormSelect
                  id="1"
                  label="Última Série Cursada:"
                  name="ultimaSerieCursada"
                  value={matricula.codigoUltimaSerieCursada}
                  onChange={handleChangeSelect}
                  options={serieCursadaOptions}
                  />
                </div>
                <div style={{ width: '90%', margin: '0' }}>
                <FormSelect
                  id="2"
                  label="Instrumento Cursado:"
                  name="instrumentoCursado1"
                  value={matricula.codigoInstrumentoCursado1}
                  onChange={handleChangeSelect}
                  options={instrumentoCursado1Options}
                  />
                </div>
                <div style={{ width: '95%', margin: '0 0 0 5px' }}>
                <FormSelect
                  id="3"
                  label="Instrumento Cursado 2:"
                  name="instrumentoCursado2"
                  value={matricula.codigoInstrumentoCursado2}
                  onChange={handleChangeSelect}
                  options={instrumentoCursado2Options}
                  />
                </div>
              </ContainerMultipleColumns>
            )}
            { matricula.codigoTipoMatricula && (
              <ContainerMultipleColumns>
                <div style={{ width: '100%', margin: '0 5px 0 0' }}>
                  <FormSelect
                  id="4"
                  label="Série pretendida:"
                  name="seriePretendida"
                  value={matricula.codigoSeriePretendida}
                  onChange={handleChangeSelect}
                  options={seriePretendidaOptions}
                  />
                </div>
                <div style={{ width: '90%', margin: '0' }}>
                <FormSelect
                  id="5"
                  label="Instrumento pretendido:"
                  name="instrumentoPretendido1"
                  value={matricula.codigoInstrumentoPretendido1}
                  onChange={handleChangeSelect}
                  options={instrumentoPretendido1Options}
                  />
                </div>
                { matricula.codigoSeriePretendida
                && parseInt(matricula.codigoSeriePretendida.replace('-', ''), 10) < 27 && (
                <div style={{ width: '95%', margin: '0 0 0 5px' }}>
                <FormSelect
                  id="6"
                  label="Instrumento pretendido 2:"
                  name="instrumentoPretendido2"
                  value={matricula.codigoInstrumentoPretendido2}
                  onChange={handleChangeSelect}
                  options={instrumentoPretendido2Options}
                  isDisabled={isInstrumentoPretendido2Disabled}
                  />
                </div>
                )}
              </ContainerMultipleColumns>
            )}
             { matricula.codigoTipoMatricula && (
               <ContainerMultipleColumns>
               <div style={{ width: '100%', margin: '0 5px 0 0' }}>
               <FormSelect
               id="6"
               label="Turma:"
               name="turma"
               value={matricula.codigoTurma}
               onChange={handleChangeSelect}
               options={turmaOptions}
               />
               </div>
               <div style={{ width: '95%', margin: '0 0 0 5px' }}>
               <FormSelect
               id="6"
               label="Turno:"
               name="turno"
               value={matricula.codigoTurno}
               onChange={handleChangeSelect}
               options={turnoOptions}
               />
               </div>
               </ContainerMultipleColumns>
             )}
            <ButtonContainer>
              <Link to="/Matricula2">
                <Buttons variant="danger"> Voltar </Buttons>
              </Link>
              <Link to="/Matricula4">
              <Buttons
                // type="submit"
                variant="success"
                disabled={!isValid}>
                Próxima
              </Buttons>
              </Link>
            </ButtonContainer>
        </Form>
        </Wrapper>
    </div>
    </>
  ); };

export default Matricula4;
