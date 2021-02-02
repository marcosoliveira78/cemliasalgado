/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Form, Jumbotron } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import uniqueId from 'lodash';
import axios from 'axios';
import estados from '../../repositories/estados.json';
import municipios from '../../repositories/municipios.json';
import request from '../../services/api';
import FormSelect from '../../component/FormSelect';
import FormField from '../../component/FormField';
import {
  ButtonContainer, Wrapper, Buttons, ContainerAlignLeft,
} from '../styles';
import { Label } from '../../component/FormSelect/styles';

const Matricula = () => {
  const history = useHistory();
  const isValid = true;
  let nextId;
  const pasta = 'matriculas';

  const [matricula, setMatricula] = useState([]);
  const [estadosOptions, setEstadosOptions] = useState([]);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [cidades, setCidades] = useState([]);

  // const [genero, setGenero] = useState([]);
  // const [naturalidade] = useState(['Leopoldina', 'Cataguases', 'Ubá', 'Muriaé']);

  // $get.cidades;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMatricula({ ...matricula, [name]: value });
  };

  const handleChangeNaturalidadeUF = (event) => {
    const { value, label } = event;
    setMatricula({ ...matricula, naturalidadeUF: label, codigoNaturalidadeUF: value });
  };

  const handleChangeNaturalidade = (event) => {
    const { value, label } = event;
    setMatricula({ ...matricula, naturalidade: label, codigoNaturalidade: value });
  };

  const handleChangeGenero = (event) => {
    const { value } = event.target;
    const label = event.target.labels[0].textContent;
    setMatricula({ ...matricula, codigoGenero: value, genero: label });
    // setGenero(value);
  };

  const handleChangeNacionalidade = (event) => {
    const { value } = event.target;
    const label = event.target.labels[0].textContent;
    setMatricula({ ...matricula, codigoNacionalidade: value, nacionalidade: label });
    // setGenero(value);
  };

  const handleSubmit = async (form) => {
    form.preventDefault();
    console.log('NOME: ', matricula.nome);
    // axios.post('http://localhost:8080/matriculas', {
    //   id: nextId,
    //   nome: matricula.nome,
    //   dataNascimento: '30/03/1978',
    //   email: 'marcsantos@hotmail.com',
    // }).then((resp) => {
    //   console.log(resp.data);
    //   history.push('/listagemGeral');
    // }).catch((error) => {
    //   console.log(error);
    // });
    fetch(`http://localhost:8080/${pasta}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          id: nextId,
          nome: matricula.nome,
          dataNascimento: matricula.dataNascimento,
          email: 'marcsantos@hotmail.com',
        }),
      })
      .then(async (resp) => {
        console.log(resp);
      // const resultado = await resp.json();
      // const lastKey = Object.keys(resultado).reverse()[0];
      // nextId = resultado[lastKey].id + 1;
      // console.log('ID: ', nextId);
      });
  };

  useEffect(() => {
    // request('get', `http://localhost:8080/${pasta}`)
    fetch(`http://localhost:8080/${pasta}`,
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
        console.log('ID: ', nextId);
      });

    setEstadosOptions(estados.map((estado) => (
      {
        value: estado.id,
        label: `${estado.nome} (${estado.sigla})`,
      }
    )));
  }, []);

  // Options
  useEffect(() => {
    if (matricula.naturalidadeUF !== undefined) {
      setCidades(municipios.map((c) => c));
      const municipiosFiltrados = cidades.filter((cidade) => (
        cidade.microrregiao.mesorregiao.UF.id.toString().includes(matricula.codigoNaturalidadeUF)));

      setCidadesOptions(municipiosFiltrados.map((cidade) => (
        {
          value: cidade.id,
          label: `${cidade.nome} - ${cidade.microrregiao.mesorregiao.UF.sigla}`,
        }
      )));
    }
  }, [matricula.codigoNaturalidadeUF]);

  // console.log('Cidades: ', cidadesOptions);
  // const response = await itemRep.save([item]);
  // if (response !== null && response.success) {
  // }

  console.log(matricula);
  return (
    <>
      <div className="root">
        <Jumbotron className="jumbotron">
          <h2>Matrícula de Alunos</h2>
          <span>Formulário de preenchimento de Matrícula.</span>
        </Jumbotron>
        <div className="divider" />

        <Wrapper>
          <Form onSubmit={handleSubmit}>
            {/* {errors.codigoGrupo && <MessageError>{errors.codigoGrupo}</MessageError>}  */}
            <FormField
              label="Nome do Aluno"
              name="nome"
              type="text"
              value={matricula.nome}
              maxLength={200}
              onChange={handleChange}
            />
            <FormField
              label="CPF"
              name="cpf"
              type="text"
              value={matricula.cpf}
              maxLength={14}
              onChange={handleChange}
            />
            <FormField
              label="Data de Nascimento"
              name="dataNascimento"
              type="text"
              value={matricula.dataNascimento}
              maxLength={10}
              onChange={handleChange}
            />
            <fieldset style={{ marginTop: '15px' }}>
              <ContainerAlignLeft className="TipoContainer">
                <Label style={{ fontSize: '18px', margin: '0 0 0 12px' }}>
                  Gênero:
                </Label>
                <Col sm={10} className="column">
                  <Form.Check
                    inline
                    label="Masculino"
                    type="radio"
                    checked={matricula.codigoGenero === '1'}
                    name="genero"
                    id="inline-genero-1"
                    value="1"
                    onChange={handleChangeGenero}
                  />
                  <Form.Check
                    inline
                    label="Feminino"
                    type="radio"
                    checked={matricula.codigoGenero === '2'}
                    name="genero"
                    id="inline-genero-2"
                    value="2"
                    onChange={handleChangeGenero}
                  />
                  <Form.Check
                    inline
                    label="Outros"
                    type="radio"
                    checked={matricula.codigoGenero === '3'}
                    name="genero"
                    id="inline-genero-3"
                    value="3"
                    onChange={handleChangeGenero}
                  />
                </Col>
              </ContainerAlignLeft>
              {/* {errors.tipoSolicitacao && <MessageError>{errors.tipoSolicitacao}</MessageError>} */}
            </fieldset>
            <fieldset style={{ marginTop: '15px' }}>
              <ContainerAlignLeft className="TipoContainer">
                <Label style={{ fontSize: '18px', margin: '0 0 0 12px' }}>
                  Nacionalidade:
                </Label>
                <Col sm={10} className="column">
                  <Form.Check
                    inline
                    label="Brasileira"
                    type="radio"
                    checked={matricula.codigoNacionalidade === '1'}
                    name="nacionalidade"
                    id="inline-nacionalidade-1"
                    value="1"
                    onChange={handleChangeNacionalidade}
                  />
                  <Form.Check
                    inline
                    label="Estrangeira"
                    type="radio"
                    checked={matricula.codigoNacionalidade === '2'}
                    name="nacionalidade"
                    id="inline-nacionalidade-2"
                    value="2"
                    onChange={handleChangeNacionalidade}
                  />
                </Col>
              </ContainerAlignLeft>
              {/* {errors.tipoSolicitacao && <MessageError>{errors.tipoSolicitacao}</MessageError>} */}
            </fieldset>
            <FormSelect
              label="Naturalidade: (Estado de Origem)"
              name="naturalidadUF"
              value={matricula.codigoNaturalidadeUF}
              onChange={handleChangeNaturalidadeUF}
              options={estadosOptions}
            />
            <FormSelect
              label="Naturalidade: (Cidade de Origem)"
              name="naturalidade"
              value={matricula.codigoNaturalidade}
              onChange={handleChangeNaturalidade}
              options={cidadesOptions}
            />
            <FormField
              label="E-mail"
              name="email"
              type="text"
              value={matricula.email}
              maxLength={200}
              onChange={handleChange}
            />
            <FormField
              label="Nome do Aluno"
              name="nome"
              type="text"
              value={matricula.nome}
              maxLength={200}
              onChange={handleChange}
            />
            <FormField
              label="Nome do Aluno"
              name="nome"
              type="text"
              value={matricula.nome}
              maxLength={200}
              onChange={handleChange}
            />
            {/* {errors.nomeItem && <MessageError>{errors.nomeItem}</MessageError>} */}
            {/* <FormField
              label="Imagem de Fundo "
              name="caminhoImagemFundo"
              type="text"
              value={item.caminhoImagemFundo}
              maxLength={300}
              onChange={handleChange}
            />
            {errors.caminhoImagemFundo && <MessageError>{errors.caminhoImagemFundo}</MessageError>}
            <FormSelect
              label="Ordem:"
              name="ordemExibicaoItem"
              value={item.ordemExibicaoItem}
              onChange={handleChangeOrdem}
              options={valores}
            />
            {errors.ordemExibicaoItem && <MessageError>{errors.ordemExibicaoItem}</MessageError>}
            <FormSwitch
              name="status"
              checked={isChecked}
              label="Status:"
              labelInline
              getValue={(checked) => getSwitchValue(checked)}
              onChange={getSwitchValue}
            />
            <FormField
              label="Palavres-Chave"
              name="tags"
              type="textarea"
              value={item.tags}
              maxLength={4000}
              onChange={handleChange}
            />
            {errors.tags && <MessageError>{errors.tags}</MessageError>} */}

            <ButtonContainer>
              <Link to="/listagemGeral">
                <Buttons variant="danger">Cancelar</Buttons>
              </Link>
              <Buttons type="submit" variant="success" disabled={!isValid}>Cadastrar</Buttons>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </div>
    </>
  );
};

export default Matricula;
