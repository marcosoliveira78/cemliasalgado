/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Form, Jumbotron } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import uniqueId from 'lodash';
// import request from '../../services/api';
import estados from '../../repositories/estados.json';
import municipios from '../../repositories/municipios.json';
import cpfMask from '../../component/mask/cpf/index';
import FormSelect from '../../component/FormSelect';
import FormField from '../../component/FormField';
import {
  ButtonContainer, Wrapper, Buttons, ContainerAlignLeft, ContainerMultipleColumns,
} from '../styles';
import { Label } from '../../component/FormSelect/styles';
import ShowMessage from '../../services/toast';

const Matricula = () => {
  // variables
  const urlBd = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://cemliasalgado.herokuapp.com';
  const history = useHistory();
  const isValid = false;
  let nextId;
  const pasta = 'matriculas';

  // hooks
  const [matricula, setMatricula] = useState([]);
  const [estadosOptions, setEstadosOptions] = useState([]);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [cidades, setCidades] = useState([]);

  // Functions

  // handles
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMatricula({ ...matricula, [name]: value });
  };

  const handleChangeSelect = (event) => {
    const { value, label } = event;
    let tipo;
    if (label.indexOf('(') >= 0) tipo = 'naturalidadeUF';
    if (label.indexOf('-') >= 0) tipo = 'naturalidade';
    switch (tipo) {
      case 'naturalidadeUF':
        setMatricula({ ...matricula, naturalidadeUF: label, codigoNaturalidadeUF: value });
        break;
      case 'naturalidade':
        setMatricula({ ...matricula, naturalidade: label, codigoNaturalidade: value });
        break;
      default:
        break;
    }
  };

  // const handleChangeNaturalidadeUF = (event) => {
  //   const { value, label } = event;
  //   setMatricula({ ...matricula, naturalidadeUF: label, codigoNaturalidadeUF: value });
  // };

  // const handleChangeNaturalidade = (event) => {
  //   const { value, label } = event;
  //   setMatricula({ ...matricula, naturalidade: label, codigoNaturalidade: value });
  // };

  const handleChangeRadio = (event) => {
    const label = event.target.labels[0].textContent;
    switch (event.target.name) {
      case 'genero':
        setMatricula({ ...matricula, genero: label });
        break;
      case 'nacionalidade':
        setMatricula({ ...matricula, nacionalidade: label });
        break;
      case 'parentesco':
        setMatricula({ ...matricula, parentesco: label });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (form) => {
    form.preventDefault();
    fetch(`${urlBd}/${pasta}`,
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
          cpf: matricula.cpf,
          dataNascimento: matricula.dataNascimento,
          email: matricula.email,
          genero: matricula.genero,
          nacionalidade: matricula.nacionalidade,
          naturalidade: matricula.naturalidade,
          naturalidadeUF: matricula.naturalidadeUF,
          status: 'A',
        }),
      })
      .then(async (resp) => {
        if (resp.ok) {
          ShowMessage('success', 'Cadastro efetuado com sucesso', 5000, uniqueId());
          history.push('/listagemGeral');
        }
      });
  };

  useEffect(() => {
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
    }
  }, [matricula.codigoNaturalidadeUF]);

  useEffect(() => {
    const municipiosFiltrados = cidades.filter((cidade) => (
      cidade.microrregiao.mesorregiao.UF.id.toString()
        .includes(matricula.codigoNaturalidadeUF)));
    setCidadesOptions(municipiosFiltrados.map((cidade) => (
      {
        value: cidade.id,
        label: `${cidade.nome} - ${cidade.microrregiao.mesorregiao.UF.sigla}`,
      }
    )));
  }, [cidades]);

  useEffect(() => {
    if (matricula.cpf) {
      const mascaraCPF = cpfMask(matricula.cpf);
      setMatricula({ ...matricula, cpf: mascaraCPF });
    }
  }, [matricula.cpf]);

  // console.log('Cidades Options: ', cidadesOptions);
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
            <ContainerMultipleColumns>
            <div style={{ width: '100%', margin: '0 5px 0 0' }}>
            <FormField
              label="E-mail"
              name="email"
              type="text"
              value={matricula.email}
              maxLength={200}
              onChange={handleChange}
            />
            </div>
            <div style={{ width: '100%', margin: '0 0 0 5px' }}>
            <FormField
              label="CPF"
              name="cpf"
              type="text"
              value={matricula.cpf}
              maxLength={14}
              onChange={handleChange}
            />
            </div>
            </ContainerMultipleColumns>
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
                    checked={matricula.genero === 'Masculino'}
                    name="genero"
                    id="inline-genero-1"
                    value="1"
                    onChange={handleChangeRadio}
                  />
                  <Form.Check
                    inline
                    label="Feminino"
                    type="radio"
                    checked={matricula.genero === 'Feminino'}
                    name="genero"
                    id="inline-genero-2"
                    value="2"
                    onChange={handleChangeRadio}
                  />
                  <Form.Check
                    inline
                    label="Outros"
                    type="radio"
                    checked={matricula.genero === 'Outros'}
                    name="genero"
                    id="inline-genero-3"
                    value="3"
                    onChange={handleChangeRadio}
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
                    checked={matricula.nacionalidade === 'Brasileira'}
                    name="nacionalidade"
                    id="inline-nacionalidade-1"
                    value="1"
                    onChange={handleChangeRadio}
                  />
                  <Form.Check
                    inline
                    label="Estrangeira"
                    type="radio"
                    checked={matricula.nacionalidade === 'Estrangeira'}
                    name="nacionalidade"
                    id="inline-nacionalidade-2"
                    value="2"
                    onChange={handleChangeRadio}
                  />
                </Col>
              </ContainerAlignLeft>
              {/* {errors.tipoSolicitacao && <MessageError>{errors.tipoSolicitacao}</MessageError>} */}
            </fieldset>
            <FormSelect
              label="Naturalidade: (Estado de Origem)"
              name="naturalidadUF"
              value={matricula.codigoNaturalidadeUF}
              onChange={handleChangeSelect}
              options={estadosOptions}
            />
            { matricula.codigoNaturalidadeUF && (
            <FormSelect
              label="Naturalidade: (Cidade de Origem)"
              name="naturalidade"
              value={matricula.codigoNaturalidade}
              onChange={handleChangeSelect}
              options={cidadesOptions}
            />
            )}
            <FormField
              label="Nome do Pai"
              name="nomePai"
              type="text"
              value={matricula.nomePai}
              maxLength={300}
              onChange={handleChange}
            />
            <FormField
              label="Nome do Mãe"
              name="nomeMae"
              type="text"
              value={matricula.nomeMae}
              maxLength={300}
              onChange={handleChange}
            />
            <FormField
              label="Responsável"
              name="responsavel"
              type="text"
              value={matricula.responsavel}
              maxLength={300}
              onChange={handleChange}
            />
            { matricula.responsavel && (
            <fieldset style={{ marginTop: '15px' }}>
              <ContainerAlignLeft className="TipoContainer">
                <Label style={{ fontSize: '18px', margin: '0 0 0 12px' }}>
                  Parentesco:
                </Label>
                <Col sm={10} className="column">
                  <Form.Check
                    inline
                    label="Mãe/Pai"
                    type="radio"
                    checked={matricula.parentesco === 'Mãe/Pai'}
                    name="parentesco"
                    id="inline-parentesco-1"
                    value="1"
                    onChange={handleChangeRadio}
                  />
                  <Form.Check
                    inline
                    label="Avô/Avó"
                    type="radio"
                    checked={matricula.parentesco === 'Avô/Avó'}
                    name="parentesco"
                    id="inline-parentesco-2"
                    value="2"
                    onChange={handleChangeRadio}
                  />
                  <Form.Check
                    inline
                    label="Tio/Tia"
                    type="radio"
                    checked={matricula.parentesco === 'Tio/Tia'}
                    name="parentesco"
                    id="inline-parentesco-3"
                    value="3"
                    onChange={handleChangeRadio}
                  />
                  <Form.Check
                    inline
                    label="o(a) próprio(a)"
                    type="radio"
                    checked={matricula.parentesco === 'o(a) próprio(a)'}
                    name="parentesco"
                    id="inline-parentesco-4"
                    value="4"
                    onChange={handleChangeRadio}
                  />
                </Col>
              </ContainerAlignLeft>
              {/* {errors.tipoSolicitacao && <MessageError>{errors.tipoSolicitacao}</MessageError>} */}
            </fieldset>
            )}
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
