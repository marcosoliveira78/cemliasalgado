/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Form, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormSelect from '../../component/FormSelect';
import { useMatricula } from '../../context/matricula';
import series from '../../repositories/series.json';
import instrumentos from '../../repositories/instrumentos.json';
import { ButtonContainer, Buttons, ContainerMultipleColumns, Wrapper } from '../styles';

const Matricula4 = () => {
  // variables

  const tiposMatricula = [
    { value: 101, label: 'Matricula (Primeira matrícula, para quem nunca estudou no Conservatório)' },
    { value: 102, label: 'Re-Matricula (Aluno que já estudou no Conservatório, mas ficou algum tempo afastado' },
    { value: 103, label: 'Renovação (Aluno que estudou em 2020)' },
  ];

  // hooks
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [tipoMatriculaOptions, setTipoMatriculaOptions] = useState([]);
  const [serieOptions, setSeriesOptions] = useState([]);
  const [instrumentoOptions, setInstrumentoOptions] = useState([]);

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
    if (value > 100 && value <= 103) tipo = 'tipoMatricula';
    if (value <= 15) tipo = 'ultimaSerieCursada';
    if (value > 200 && value <= 220) tipo = 'instrumentoCursado1';
    // if (value.toString().length === 9) tipo = 'codigoDistrito';
    switch (tipo) {
      case 'tipoMatricula':
        setMatricula({ ...matricula, tipoMatricula: label, codigoTipoMatricula: value });
        break;
      case 'ultimaSerieCursada':
        setMatricula({ ...matricula, ultimaSerieCursada: label, codigoUltimaSerieCursada: value });
        break;
      case 'instrumentoCursado1':
        setMatricula({ ...matricula, instrumentoCursado1: label, codigoinstrumentoCursado1: value });
        break;
      default:
        break;
    }
  };

  const handleChangeSelect2 = (event) => {
    const { value, label } = event;
    let tipo;
    if (value > 200 && value <= 220) tipo = 'instrumentoCursado2';
    switch (tipo) {
      case 'instrumentoCursado2':
        setMatricula({ ...matricula, instrumentoCursado2: label, codigoinstrumentoCursado2: value });
        break;
      default:
        break;
    }
  };

  // triggers
  useEffect(() => {
    setTipoMatriculaOptions(tiposMatricula.map((tipo) => (
      {
        value: tipo.value,
        label: `${tipo.label}`,
      // label: `${cidade.nome} - ${cidade.microrregiao.mesorregiao.UF.sigla}`,
      }
    )));
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
    setSeriesOptions(series.map((serie) => (
      {
        value: serie.id,
        label: `${serie.nome}`,
      }
    )));
    setInstrumentoOptions(instrumentos.map((instrumento) => (
      {
        value: instrumento.id,
        label: `${instrumento.nome}`,
      }
    )));
  }, [matricula.tipoMatricula]);

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
            && matricula.codigoTipoMatricula.toString() !== '101'
            && (
              <ContainerMultipleColumns>
                <div style={{ width: '40%', margin: '0 5px 0 0' }}>
                  <FormSelect
                  label="Última Série Cursada:"
                  name="ultimaSerieCursada"
                  value={matricula.codigoUltimaSerieCursada}
                  onChange={handleChangeSelect}
                  options={serieOptions}
                  />
                </div>
                <div style={{ width: '35%', margin: '0' }}>
                <FormSelect
                  label="Instrumento Cursado:"
                  name="instrumentoCursado1"
                  value={matricula.codigoinstrumentoCursado1}
                  onChange={handleChangeSelect}
                  options={instrumentoOptions}
                  />
                </div>
                <div style={{ width: '37%', margin: '0 0 0 5px' }}>
                <FormSelect
                  label="Instrumento Cursado 2:"
                  name="instrumentoCursado2"
                  value={matricula.codigoinstrumentoCursado2}
                  onChange={handleChangeSelect2}
                  options={instrumentoOptions}
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
