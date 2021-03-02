/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { Form, Jumbotron, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import uniqueId from 'lodash';
import { FormControlLabel, Switch } from '@material-ui/core';
import estados from '../../repositories/estados.json';
import municipios from '../../repositories/municipios.json';
import distritos from '../../repositories/distritos.json';
import FormSelect from '../../component/FormSelect';
import FormField from '../../component/FormField';
import {
  ButtonContainer, Wrapper, Buttons,
  ContainerMultipleColumns, MessageError, Container,
} from '../styles';
import ShowMessage from '../../services/toast';
import { useMatricula } from '../../context/matricula';
import cepMask from '../../component/mask/cep';

const Matricula = () => {
  // variables
  const urlBd = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://cemliasalgado.herokuapp.com';
  const pasta = 'matriculas';
  const urlCEP = 'https://viacep.com.br/';
  const history = useHistory();

  // hooks
  const { matricula, setMatricula } = useMatricula({});
  const [estadosOptions, setEstadosOptions] = useState([]);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [distritosOptions, setDistritosOptions] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

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
    // if (cep !== undefined) {
    //   if (cep === '') {
    //     const mensagem = 'CEP deve ser preenchido.';
    //     erro.cep = mensagem;
    //   }
    // }
    if (logradouro === undefined || logradouro === '') {
      const mensagem = 'Logradouro deve ser preenchido.';
      erro.logradouro = mensagem;
    }
    if (numero === undefined || numero === '') {
      const mensagem = 'Nº deve ser preenchido.';
      erro.numero = mensagem;
    }
    if (bairro === undefined || bairro === '') {
      const mensagem = 'Bairro deve ser preenchido.';
      erro.bairro = mensagem;
    }
    if (municipio === undefined) {
      const mensagem = 'Município deve ser selecionado.';
      erro.municipio = mensagem;
    }
    if (uf === undefined) {
      const mensagem = 'Estado deve ser selecionado.';
      erro.uf = mensagem;
    }
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
  // const handleChangeRadio = (event) => {
  //   const label = event.target.labels[0].textContent;
  //   switch (event.target.name) {
  //     case 'nacionalidade':
  //       setMatricula({ ...matricula, nacionalidade: label });
  //       break;
  //     case 'grauParentesco':
  //       setMatricula({ ...matricula, grauParentesco: label });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMatricula({ ...matricula, [name]: value });
  };

  const handleChangeSelect = (event) => {
    const { value, label } = event;
    let tipo;
    if (value.toString().length === 2) tipo = 'codigoUf';
    if (value.toString().length === 7) tipo = 'codigoMunicipio';
    if (value.toString().length === 9) tipo = 'codigoDistrito';
    switch (tipo) {
      case 'codigoUf':
        setMatricula({ ...matricula, uf: label, codigoUf: value, cep: '' });
        break;
      case 'codigoMunicipio':
        setMatricula({ ...matricula, municipio: label, codigoMunicipio: value, cep: '' });
        break;
      case 'codigoDistrito':
        setMatricula({ ...matricula, distrito: label, codigoDistrito: value });
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
      case 4:
        history.push('/matricula4');
        break;
      case 5:
        history.push('/matricula5');
        break;
      default:
        break;
    }
  };

  // Triggers
  useEffect(() => {
    // if (!matricula.pageIdentificacao) {
    //   history.push('/matricula');
    // }
    if (!matricula.pageOrigem) {
      history.push('/matricula2');
    }

    setEstadosOptions(estados.map((estado) => (
      {
        value: estado.id,
        label: `${estado.sigla}`,
      }
    )));
  }, []);

  useEffect(() => {
    if (matricula.uf !== undefined) {
      setCidades(municipios.map((c) => c));
    }
  }, [matricula.uf]);

  useEffect(() => {
    const municipiosFiltrados = cidades.filter((cidade) => (
      cidade.microrregiao.mesorregiao.UF.sigla.toString()
        .includes(matricula.uf)));
    setCidadesOptions(municipiosFiltrados.map((cidade) => (
      {
        value: cidade.id,
        label: `${cidade.nome}`,
      }
    )));
  }, [cidades]);

  useEffect(() => {
    if (matricula.cep) {
      setMatricula({ ...matricula, municipio: '', codigoMunicipio: '' });
    }
  }, [matricula.logradouro]);

  useEffect(() => {
    if (matricula.cep) {
      const mascaraCEP = cepMask(matricula.cep);
      setMatricula({ ...matricula, cep: mascaraCEP });
      if (matricula.cep.length === 10) {
        const cepUnmask = matricula.cep.replace(/\D/g, '');
        fetch(`${urlCEP}/ws/${cepUnmask}/json`)
          .then(async (resp) => {
            const resultado = await resp.json();
            if (resultado.erro) {
              setErrors({ ...errors, cep: 'CEP inválido' });
            } else {
              const codigoUF = estados.filter((e) => (e.sigla === resultado.uf));
              setMatricula({ ...matricula,
                logradouro: resultado.logradouro,
                complemento: resultado.complemento !== '' ? resultado.complemento : matricula.complemento,
                bairro: resultado.bairro,
                municipio: resultado.localidade,
                codigoMunicipio: parseInt(resultado.ibge, 10),
                uf: resultado.uf,
                codigoUf: codigoUF[0].id,
              });
            }
          });
      }
    }
  }, [matricula.cep]);

  useEffect(() => {
    if (matricula.cep === undefined) {
      setMatricula({ ...matricula, cep: '' });
    }
    if (matricula.municipio) {
      // if (matricula.cep === '') {
      if (matricula.logradouro.length > 13) {
        fetch(`${urlCEP}/ws/${matricula.uf}/${matricula.municipio}/${matricula.logradouro}/json`)
          .then(async (resp) => {
            const resultado = await resp.json();
            if (resultado.length === 0) {
              // setErrors({ ...errors, cep: 'CEP não localizado' });
            } else {
              setErrors({ ...errors, cep: '' });
              // console.log('CEP ENCONTRADO:', resultado[0].cep);
              setMatricula({ ...matricula,
                cep: resultado[0].cep,
              });
            }
          });
      }
      // }
    }
  }, [matricula.municipio]);

  useEffect(() => {
    if (matricula.codigoMunicipio && matricula.codigoMunicipio > 0) {
      const distritosFiltrados = distritos.filter((d) => d.id.toString().includes(matricula.codigoMunicipio));
      setDistritosOptions(distritosFiltrados.map((distrito) => (
        {
          value: distrito.id,
          label: `${distrito.nome}`,
        }
      )));
    }
  }, [matricula.codigoMunicipio]);

  useEffect(() => {
    if (matricula.responsavel === '') {
      setMatricula({ ...matricula, parentesco: '' });
    }
  }, [matricula.responsavel]);

  useEffect(() => {
    setMatricula({ ...matricula, pageEndereco: isValid });
  }, [isValid]);

  useEffect(() => {
    if (matricula.logradouro !== undefined) {
      validateIsValid();
    }
  }, [errors]);

  useEffect(() => {
    if (matricula.nome) {
      setErrors(validate(matricula));
    }
  }, [matricula]);

  return (
    <>
      <div className="root">
        <Jumbotron className="jumbotron">
          <h2>Matrícula de Alunos</h2>
        </Jumbotron>
        <div className="divider" />
        <Container>
        <ToggleButtonGroup type="radio" name="options" defaultValue={3} onChange={handleChangePage}>
          <ToggleButton className="btn-warning" value={1}>Identificação</ToggleButton>
          <ToggleButton className="btn-warning" value={2}>Origem</ToggleButton>
          <ToggleButton className="btn-warning" value={3}>Endereço</ToggleButton>
          <ToggleButton className="btn-warning" disabled={!isValid} value={4}>Matrícula</ToggleButton>
          <ToggleButton className="btn-warning" disabled={!isValid} value={5}>Procedência</ToggleButton>
        </ToggleButtonGroup>
        </Container>
        <Wrapper>
          <Form>
            <ContainerMultipleColumns>
            <div style={{ width: '35%', margin: '0 5px 0 0' }}>
            <FormField
                label="CEP"
                name="cep"
                type="text"
                value={matricula.cep}
                maxLength={10}
                onChange={handleChange}
                autoFocus
                />
              {errors.cep && <MessageError>{errors.cep}</MessageError>}
            </div>
            </ContainerMultipleColumns>
            <ContainerMultipleColumns>
            <div style={{ width: '100%', margin: '0 5px 0 0' }}>
              <FormField
              label="Logradouro (Rua, Avenida, Praça)"
              name="logradouro"
              type="text"
              value={matricula.logradouro}
              maxLength={300}
              onChange={handleChange}
              />
            {errors.logradouro && <MessageError>{errors.logradouro}</MessageError>}
            </div>
            <div style={{ width: '30%', margin: '0 0 0 5px' }}>
              <FormField
              label="Número"
              name="numero"
              type="text"
              value={matricula.numero}
              maxLength={8}
              onChange={handleChange}
              />
              {errors.numero && <MessageError>{errors.numero}</MessageError>}
            </div>
            </ContainerMultipleColumns>
            <ContainerMultipleColumns>
            <div style={{ width: '75%', margin: '0 5px 0 0' }}>
              <FormField
              label="Complemento"
              name="complemento"
              type="text"
              value={matricula.complemento}
              maxLength={200}
              onChange={handleChange}
            />
            {errors.complemento && <MessageError>{errors.complemento}</MessageError>}
            </div>
            <div style={{ width: '100%', margin: '0 0 0 5px' }}>
            <FormField
              label="Bairro"
              name="bairro"
              type="text"
              value={matricula.bairro}
              maxLength={200}
              onChange={handleChange}
            />
            {errors.bairro && <MessageError>{errors.bairro}</MessageError>}
            </div>
            </ContainerMultipleColumns>
            <ContainerMultipleColumns>
            <div style={{ width: '50%', margin: '0 5px 0 0' }}>
            <FormSelect
              label="Estado:"
              name="uf"
              value={matricula.codigoUf}
              onChange={handleChangeSelect}
              options={estadosOptions}
            />
            {errors.uf && <MessageError>{errors.uf}</MessageError>}
            </div>
            <div style={{ width: '100%', margin: '0 0 0 5px' }}>
            <FormSelect
              label="Município:"
              name="municipio"
              value={matricula.codigoMunicipio}
              onChange={handleChangeSelect}
              options={cidadesOptions}
            />
            {errors.municipio && <MessageError>{errors.municipio}</MessageError>}
            </div>
            <div style={{ width: '100%', margin: '0 0 0 5px' }}>
            <FormSelect
              label="Distrito:"
              name="distrito"
              value={matricula.codigoDistrito}
              onChange={handleChangeSelect}
              options={distritosOptions}
            />
            {errors.distrito && <MessageError>{errors.distrito}</MessageError>}
            </div>
            </ContainerMultipleColumns>
            <ButtonContainer>
              <Link to="/matricula2">
                <Buttons variant="danger"> Voltar </Buttons>
              </Link>
              <Link to="/matricula4">
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
  );
};

export default Matricula;
