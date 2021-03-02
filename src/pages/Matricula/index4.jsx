/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Form, Jumbotron, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import FormSelect from '../../component/FormSelect';
import { useMatricula } from '../../context/matricula';
import series from '../../repositories/series.json';
import instrumentos from '../../repositories/instrumentos.json';
import turmas from '../../repositories/turma.json';
import tiposMatricula from '../../repositories/tiposMatricula.json';
import turnos from '../../repositories/turnos.json';
import { ButtonContainer, Buttons, Container, ContainerMultipleColumns, MessageError, Wrapper } from '../styles';

const Matricula4 = () => {
  // variables
  const history = useHistory();

  // hooks
  const [isValid, setIsValid] = useState(false);
  const [isSerieValida, setIsSerieValida] = useState(true);
  const [isSerieCursadaValida, setIsSerieCursadaValida] = useState(true);
  const [errors, setErrors] = useState({});
  const [tipoMatriculaOptions, setTipoMatriculaOptions] = useState([]);
  const [serieCursadaOptions, setSerieCursadaOptions] = useState([]);
  const [seriePretendidaOptions, setSeriePretendidaOptions] = useState([]);
  const [instrumentoCursado1Options, setInstrumentoCursado1Options] = useState([]);
  const [instrumentoCursado2Options, setInstrumentoCursado2Options] = useState([]);
  const [instrumentoPretendido1Options, setInstrumentoPretendido1Options] = useState([]);
  const [instrumentoPretendido2Options, setInstrumentoPretendido2Options] = useState([]);
  const [isInstrumentoCursado2Disabled, setIsInstrumentoCursado2Disabled] = useState(false);
  const [isInstrumentoPretendido2Disabled, setIsInstrumentoPretendido2Disabled] = useState(false);
  const [turmaOptions, setTurmaOptions] = useState([]);
  const [turnoOptions, setTurnoOptions] = useState([]);
  const [tipoMatriculaFilter, setTipoMatriculaFilter] = useState([]);
  const [instrumentosFilter, setInstrumentosFilter] = useState([]);
  const [turmaFilter, setTurmaFilter] = useState([]);
  const [seriesFilter, setSeriesFilter] = useState([]);

  // context
  const { matricula, setMatricula } = useMatricula({});

  //  Validations
  const validateInstrumentoPretendido2 = () => {
    if (matricula.codigoSeriePretendida) {
      if (matricula.codigoSeriePretendida === '') { setIsSerieValida(true);
      } else {
        setIsSerieValida(parseInt(matricula.codigoSeriePretendida.split('-')[1], 10) < 7);
      }
    }
  };

  const validateInstrumentoCursado2 = () => {
    if (matricula.codigoUltimaSerieCursada) {
      if (matricula.codigoUltimaSerieCursada === '') { setIsSerieCursadaValida(true);
      } else {
        setIsSerieCursadaValida(parseInt(matricula.codigoUltimaSerieCursada.split('-')[1], 10) < 7);
        if (parseInt(matricula.codigoUltimaSerieCursada.split('-')[1], 10) >= 7) {
          setMatricula({ ...matricula, instrumentoCursado2: '', codigoInstrumentoCursado2: '' });
        }
      }
    }
  };

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
    if (tipoMatricula !== undefined) {
      if (tipoMatricula.indexOf('Primeira') === -1) {
        if (ultimaSerieCursada === '') {
          const mensagem = 'Última série cursada deve ser selecionada.';
          erro.ultimaSerieCursada = mensagem;
        }
        if (instrumentoCursado1 === '') {
          const mensagem = 'Instrumento cursado deve ser selecionado.';
          erro.instrumentoCursado1 = mensagem;
        }
        if (instrumentoCursado2 === '') {
          const mensagem = 'Instrumento cursado 2 deve ser selecionado.';
          erro.instrumentoCursado2 = mensagem;
        }
      }
      if (seriePretendida === '') {
        const mensagem = 'Série pretendida deve ser selecionada.';
        erro.seriePretendida = mensagem;
      }
      if (instrumentoPretendido1 === '') {
        const mensagem = 'Instrumento pretendido deve ser selecionado.';
        erro.instrumentoPretendido1 = mensagem;
      }
      if (parseInt(matricula.codigoSeriePretendida.split('-')[1], 10) < 7 || instrumentoPretendido2 === '') {
        if (instrumentoPretendido1 !== 'CANTO' && instrumentoPretendido2 === '') {
          const mensagem = 'Instrumento cursado 2 deve ser selecionado.';
          erro.instrumentoPretendido2 = mensagem;
        }
      } else {
        matricula.instrumentoPretendido2 = '';
        matricula.codigoInstrumentoPretendido2 = '';
      }
      if (turma === '') {
        const mensagem = 'Turma deve ser selecionada.';
        erro.turma = mensagem;
      }
      if (turno === '') {
        const mensagem = 'Turno deve ser selecionado.';
        erro.turno = mensagem;
      }
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
    matricula.codigoTurma = '';
    matricula.turno = '';
    matricula.codigoTurno = '';
    setIsValid(false);
  };

  const populaInstrumentosCursados = () => {
    setInstrumentoCursado1Options(instrumentosFilter.map((instrumento) => (
      { value: `3-${instrumento.id}`, label: `${instrumento.nome}` }
    )));
    setInstrumentoCursado2Options(instrumentosFilter.map((instrumento) => {
      let disabled = 'no';
      if (instrumento.nome.toLocaleLowerCase() === 'canto') disabled = 'yes';
      if (matricula.instrumentoCursado1 !== undefined) {
        if (instrumento.nome.toLocaleLowerCase() === matricula.instrumentoCursado1.toLocaleLowerCase()) disabled = 'yes';
      }
      return (
        { value: `4-${instrumento.id}`, label: `${instrumento.nome}`, disabled });
    }));
  };
  const populaInstrumentosPretendidos = () => {
    setInstrumentoPretendido1Options(instrumentosFilter.map((instrumento) => (
      { value: `5-${instrumento.id}`, label: `${instrumento.nome}` }
    )));
    setInstrumentoPretendido2Options(instrumentosFilter.map((instrumento) => {
      let disabled = 'no';
      if (instrumento.nome.toLocaleLowerCase() === 'canto') disabled = 'yes';
      if (matricula.instrumentoPretendido1 !== undefined) {
        if (instrumento.nome.toLocaleLowerCase() === matricula.instrumentoPretendido1.toLocaleLowerCase()) {
          disabled = 'yes';
        }
      }
      return (
        { value: `6-${instrumento.id}`, label: `${instrumento.nome}`, disabled });
    }));
  };

  const changeSelectInstrumentoCursado = (codigoSerie, serie, codigoInstrumento, instrumento) => {
    setMatricula({ ...matricula,
      codigoUltimaSerieCursada: codigoSerie,
      ultimaSerieCursada: serie,
      codigoInstrumentoCursado2: codigoInstrumento,
      instrumentoCursado2: instrumento,
    });
    setIsInstrumentoCursado2Disabled(true);
    populaInstrumentosCursados();
  };

  const changeSelectInstrumentoPretendido = (codigoSerie, serie, codigoInstrumento, instrumento) => {
    setMatricula({ ...matricula,
      codigoSeriePretendida: codigoSerie,
      seriePretendida: serie,
      codigoInstrumentoPretendido2: codigoInstrumento,
      instrumentoPretendido2: instrumento,
    });
    setIsInstrumentoPretendido2Disabled(true);
    populaInstrumentosPretendidos();
  };

  // handles
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMatricula({ ...matricula, [name]: value });
  };

  const handleChangeSelect = (event) => {
    const { value, label } = event;
    let tipo;
    if (value.split('-')[0].toString() === '0') tipo = 'tipoMatricula';
    if (value.split('-')[0].toString() === '1') tipo = 'ultimaSerieCursada';
    if (value.split('-')[0].toString() === '2') tipo = 'seriePretendida';
    if (value.split('-')[0].toString() === '3') tipo = 'instrumentoCursado1';
    if (value.split('-')[0].toString() === '4') tipo = 'instrumentoCursado2';
    if (value.split('-')[0].toString() === '5') tipo = 'instrumentoPretendido1';
    if (value.split('-')[0].toString() === '6') tipo = 'instrumentoPretendido2';
    if (value.split('-')[0].toString() === '7') tipo = 'turma';
    if (value.split('-')[0].toString() === '8') tipo = 'turno';
    switch (tipo) {
      case 'tipoMatricula':
        clearTipoMatricula();
        setMatricula({ ...matricula, tipoMatricula: label, codigoTipoMatricula: value });
        break;
      case 'ultimaSerieCursada':
        setMatricula({ ...matricula, ultimaSerieCursada: label, codigoUltimaSerieCursada: value });
        break;
      case 'instrumentoCursado1':
        setMatricula({ ...matricula, instrumentoCursado1: label, codigoInstrumentoCursado1: value, instrumentoCursado2: '', codigoInstrumentoCursado2: '' });
        break;
      case 'instrumentoCursado2':
        setMatricula({ ...matricula, instrumentoCursado2: label, codigoInstrumentoCursado2: value });
        break;
      case 'seriePretendida':
        setMatricula({ ...matricula, seriePretendida: label, codigoSeriePretendida: value });
        break;
      case 'instrumentoPretendido1':
        setMatricula({ ...matricula, instrumentoPretendido1: label, codigoInstrumentoPretendido1: value, codigoInstrumentoPretendido2: '', instrumentoPretendido2: '' });
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

  const handleChangePage = (val) => {
    switch (val) {
      case 1:
        history.push('/matricula');
        break;
      case 2:
        history.push('/matricula2');
        break;
      case 3:
        history.push('/matricula3');
        break;
      case 5:
        history.push('/matricula5');
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
    if (!matricula.nacionalidade) {
      history.push('/matricula2');
    }
    if (!matricula.logradouro) {
      history.push('/matricula3');
    }
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
    const matriculasFiltradas = tiposMatricula.filter((tipoMatricula) => (parseInt(matricula.idadeEscolar, 10) >= parseInt(tipoMatricula.idadeExibicao, 10)));
    setTipoMatriculaFilter(matriculasFiltradas);
    const instrumentosFiltrados = instrumentos.filter((instrumento) => (parseInt(instrumento.idadeMinima, 10) <= parseInt(matricula.idadeEscolar, 10)));
    setInstrumentosFilter(instrumentosFiltrados);
    const turmasFiltradas = turmas.filter((serie) => (parseInt(serie.idadeMaxima, 10) >= parseInt(matricula.idadeEscolar, 10) && parseInt(serie.idadeMinima, 10) <= parseInt(matricula.idadeEscolar, 10)));
    setTurmaFilter(turmasFiltradas);
  }, [matricula.idadeEscolar]);

  useEffect(() => {
    setTipoMatriculaOptions(tipoMatriculaFilter.map((tipo) => (
      { value: `0-${tipo.id}`, label: `${tipo.nome}` })));
  }, [tipoMatriculaFilter]);

  useEffect(() => {
    setSerieCursadaOptions(seriesFilter.map((serie) => (
      { value: `1-${serie.id}`, label: `${serie.nome}` })));
    setSeriePretendidaOptions(seriesFilter.map((serie) => {
      let disabled = 'no';
      if (matricula.tipoMatricula.indexOf('Re') === -1
      && (matricula.instrumentoPretendido1.toLocaleLowerCase() !== 'canto'
      || matricula.instrumentoPretendido1 === '')
      && serie.nome !== '1º INICIAL') { disabled = 'yes'; }
      return (
        { value: `2-${serie.id}`, label: `${serie.nome}`, disabled });
    }));
  }, [seriesFilter]);

  useEffect(() => {
    setTurnoOptions(turnos.map((t) => (
      { value: `8-${t.id}`, label: `${t.nome}` })));
    if (matricula.tipoMatricula !== undefined) {
      let seriesFiltradas = '';
      if (matricula.tipoMatricula.indexOf('Primeira') === -1) {
        seriesFiltradas = series.filter((serie) => (parseInt(serie.idadeMinima, 10) <= parseInt(matricula.idadeEscolar, 10)));
      } else {
        seriesFiltradas = series.filter((serie) => (parseInt(serie.idadeMinima, 10) <= parseInt(matricula.idadeEscolar, 10) && serie.primeiraMatricula === true));
      }
      setSeriesFilter(seriesFiltradas);
    }
  }, [matricula.tipoMatricula]);

  useEffect(() => {
    setTurmaOptions(turmaFilter.map((idade) => (
      { value: `7-${idade.id}`, label: `${idade.nome}` })));
  }, [turmaFilter]);

  useEffect(() => {
    populaInstrumentosCursados();
    populaInstrumentosPretendidos();
  }, [instrumentosFilter]);

  useEffect(() => {
    validateInstrumentoPretendido2();
    populaInstrumentosPretendidos();
    if (matricula.codigoSeriePretendida !== undefined) {
      const serie = parseInt(matricula.codigoSeriePretendida.split('-')[1], 10);
      if (matricula.instrumentoPretendido1 === 'CANTO') {
        switch (serie) {
          case 1:
          case 2:
          case 3:
          case 4:
            changeSelectInstrumentoPretendido('2-4', '4º INTERMEDIÁRIO', '6-210', 'VIOLÃO');
            break;
          case 5:
            changeSelectInstrumentoPretendido('2-5', '5º INTERMEDIÁRIO', '6-209', 'TECLADO');
            break;
          case 6:
            changeSelectInstrumentoPretendido('2-6', '6º INTERMEDIÁRIO', '6-207', 'PIANO');
            break;
          default:
            matricula.codigoInstrumentoPretendido2 = '';
            matricula.instrumentoPretendido2 = '';
            break;
        }
      } else
      if (matricula.instrumentoPretendido1 !== 'CANTO') {
        setIsInstrumentoPretendido2Disabled(false);
        populaInstrumentosPretendidos();
      }
    }
  }, [matricula.codigoInstrumentoPretendido1, matricula.seriePretendida]);

  useEffect(() => {
    validateInstrumentoCursado2();
    populaInstrumentosPretendidos();
    if (matricula.codigoUltimaSerieCursada !== undefined) {
      const serie = parseInt(matricula.codigoUltimaSerieCursada.split('-')[1], 10);
      if (matricula.instrumentoCursado1 === 'CANTO') {
        switch (serie) {
          case 1:
          case 2:
          case 3:
          case 4:
            changeSelectInstrumentoCursado('1-4', '4º INTERMEDIÁRIO', '4-210', 'VIOLÃO');
            break;
          case 5:
            changeSelectInstrumentoCursado('1-5', '5º INTERMEDIÁRIO', '4-209', 'TECLADO');
            break;
          case 6:
            changeSelectInstrumentoCursado('1-6', '6º INTERMEDIÁRIO', '4-207', 'PIANO');
            break;
          default:
            matricula.codigoInstrumentoCursado2 = '';
            matricula.instrumentoCursado2 = '';
            break;
        }
      } else
      if (matricula.instrumentoCursado1 !== 'CANTO') {
        setIsInstrumentoCursado2Disabled(false);
        populaInstrumentosCursados();
      }
    }
  }, [matricula.ultimaSerieCursada, matricula.codigoInstrumentoCursado1]);

  // console.log('Página 4', matricula);
  return (
    <>
    <div className="root">
        <Jumbotron className="jumbotron">
          <h2>Matrícula de Alunos</h2>
        </Jumbotron>
        <div className="divider" />
        <Container>
        <ToggleButtonGroup type="radio" name="options" defaultValue={4} onChange={handleChangePage}>
          <ToggleButton className="btn-warning" value={1}>Identificação</ToggleButton>
          <ToggleButton className="btn-warning" value={2}>Origem</ToggleButton>
          <ToggleButton className="btn-warning" value={3}>Endereço</ToggleButton>
          <ToggleButton className="btn-warning" value={4}>Matrícula</ToggleButton>
          <ToggleButton className="btn-warning" disabled={!isValid} value={5}>Procedência</ToggleButton>
        </ToggleButtonGroup>
        </Container>
        <Wrapper style={{ marginBottom: '40px' }}>
        <Form>
        <FormSelect
              label="Tipo de Matrícula:"
              name="tipoMatricula"
              value={matricula.codigoTipoMatricula}
              onChange={handleChangeSelect}
              options={tipoMatriculaOptions}
              autoFocus
            />
            {errors.tipoMatricula && <MessageError>{errors.tipoMatricula}</MessageError>}
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
                  {errors.ultimaSerieCursada && <MessageError>{errors.ultimaSerieCursada}</MessageError>}
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
                  {errors.instrumentoCursado1 && <MessageError>{errors.instrumentoCursado1}</MessageError>}
                </div>
                { isSerieCursadaValida && (
                <div style={{ width: '95%', margin: '0 0 0 5px' }}>
                <FormSelect
                  id="3"
                  label="Instrumento Cursado 2:"
                  name="instrumentoCursado2"
                  value={matricula.codigoInstrumentoCursado2}
                  onChange={handleChangeSelect}
                  options={instrumentoCursado2Options}
                  isDisabled={isInstrumentoCursado2Disabled}
                  />
                  {errors.instrumentoCursado2 && <MessageError>{errors.instrumentoCursado2}</MessageError>}
                </div>
                )}
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
                  {errors.seriePretendida && <MessageError>{errors.seriePretendida}</MessageError>}
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
                  {errors.instrumentoPretendido1 && <MessageError>{errors.instrumentoPretendido1}</MessageError>}
                </div>
                { isSerieValida && (
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
                  {errors.instrumentoPretendido2 && <MessageError>{errors.instrumentoPretendido2}</MessageError>}
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
               {errors.turma && <MessageError>{errors.turma}</MessageError>}
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
               {errors.turno && <MessageError>{errors.turno}</MessageError>}
               </div>
               </ContainerMultipleColumns>
             )}
            <ButtonContainer>
              <Link to="/matricula3">
                <Buttons variant="danger"> Voltar </Buttons>
              </Link>
              <Link to="/matricula5">
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
