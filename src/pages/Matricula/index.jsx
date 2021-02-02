/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Form, Jumbotron } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import uniqueId from 'lodash';
// import cidades from 'cidades-estados-brasil-json';
import axios from 'axios';
import request from '../../services/api';
import FormSelect from '../../component/FormSelect';
import FormField from '../../component/FormField';
import {
  ButtonContainer, Wrapper, Buttons, ContainerAlignLeft,
} from '../styles';
import { Label } from '../../component/FormSelect/styles';

const Matricula = () => {
  const valoresInciais = { codigoGenero: 2 };
  const history = useHistory();
  const isValid = true;
  let nextId;
  const pasta = 'matriculas';

  const [matricula, setMatricula] = useState([]);
  const [genero, setGenero] = useState([]);
  const [naturalidade] = useState(['Leopoldina', 'Cataguases', 'Ubá', 'Muriaé']);

  // $get.cidades;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMatricula({ ...matricula, [name]: value });
  };

  const handleChangeNaturalidade = (event) => {
    const { value, label } = event.target;
    setMatricula({ ...matricula, naturalidade: label, codigoNaturalidade: value });
    // setMatricula({ ...matricula, codigoNaturalidade: value });
    // getSwitchNaturalidade(value);
  };

  const handleChangeGenero = (event) => {
    const { value, label } = event.target;
    setMatricula({ ...matricula, codigoGenero: value, genero: label });
    setGenero(value);
  };

  const handleSubmit = async (form) => {
    form.preventDefault();
    console.log('NOME: ', matricula.nome);
    axios.post('http://localhost:8080/matriculas', {
      id: nextId,
      nome: matricula.nome,
      dataNascimento: '30/03/1978',
      email: 'marcsantos@hotmail.com',
    }).then((resp) => {
      console.log(resp.data);
      history.push('/listagemGeral');
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    request('get', `http://localhost:8080/${pasta}`)
      .then(async (resp) => {
        const resultado = await resp;
        const lastKey = Object.keys(resultado).reverse()[0];
        nextId = resultado[lastKey].id + 1;
        console.log('ID: ', nextId);
      });
  }, []);

  let cidadeId = 1;
  // Options
  const naturalidadeOptions = naturalidade.map((cidade) => (
    {
      value: cidadeId++,
      label: cidade,
    }
  ));

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
            {/* <FormSelect
              label="Grupo:"
              name="codigoGrupo"
              value={item.codigoGrupo}
              onChange={handleChangeGrupo}
              options={groupOptions}
            />
            {errors.codigoGrupo && <MessageError>{errors.codigoGrupo}</MessageError>} */}
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
              maxLength={13}
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
            <FormSelect
              label="Naturalidade:"
              name="naturalidade"
              value={matricula.codigoNaturalidade}
              onChange={handleChangeNaturalidade}
              options={naturalidadeOptions}
            />
            <fieldset>
              <ContainerAlignLeft className="TipoContainer">
                <Label style={{ fontSize: '18px', margin: 0 }}>
                  Tipo:
                </Label>
                <Col sm={10} className="column">
                  <Form.Check
                    inline
                    label="Masculino"
                    type="radio"
                    checked={genero === '1'}
                    name="genero"
                    id="inline-radio-1"
                    value="1"
                    onChange={handleChangeGenero}
                  />
                  <Form.Check
                    inline
                    label="Feminino"
                    type="radio"
                    checked={genero === '2'}
                    name="genero"
                    id="inline-radio-2"
                    value="2"
                    onChange={handleChangeGenero}
                  />
                  <Form.Check
                    inline
                    label="Outros"
                    type="radio"
                    checked={genero === '3'}
                    name="genero"
                    id="inline-radio-3"
                    value="3"
                    onChange={handleChangeGenero}
                  />
                </Col>
              </ContainerAlignLeft>
              {/* {errors.tipoSolicitacao && <MessageError>{errors.tipoSolicitacao}</MessageError>} */}
            </fieldset>
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
