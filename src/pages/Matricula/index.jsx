/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Form, Jumbotron, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import cpfMask from '../../component/mask/cpf/index';
import FormField from '../../component/FormField';
import {
  ButtonContainer, Wrapper, Buttons, ContainerAlignLeft,
  ContainerMultipleColumns, MessageError, Container,
} from '../styles';
import { Label } from '../../component/FormSelect/styles';
import dateMask from '../../component/mask/data';
import telefoneMask from '../../component/mask/telefone';
import celularMask from '../../component/mask/celular';
import { validateEmail, validateCPF, validateData } from '../../component/Validate';
import { useMatricula } from '../../context/matricula';
import { calculaIdadeEscolar } from '../../component/Convert/Idade';

const Matricula = () => {
  // variables
  const urlBd = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://cemliasalgado.herokuapp.com';
  const pasta = 'matriculas';
  const history = useHistory();
  // let nextId;
  // const now = new Date();

  // hooks
  const { matricula, setMatricula } = useMatricula({ });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  // Functions

  // const dataAtual = convertDate(now);

  //  Validations
  const validate = (data) => {
    const { nome, email, cpf, telefonePrincipal, idadeEscolar,
      telefoneSecundario, dataNascimento, genero,
    } = data;
    const erro = {};
    if (nome === undefined || nome === '') {
      const mensagem = 'Nome do Aluno deve ser preenchido.';
      erro.nome = mensagem;
    }
    if (email === undefined || email === '') {
      const mensagem = 'E-mail deve ser preenchido.';
      erro.email = mensagem;
    }
    if (email !== undefined) {
      if (email.length > 0 && !validateEmail(email)) {
        const mensagem = 'E-mail inválido.';
        erro.email = mensagem;
      }
    }
    if (cpf === undefined || cpf === '') {
      const mensagem = 'CPF deve ser preenchido.';
      erro.cpf = mensagem;
    }
    if (cpf !== undefined) {
      if (cpf.length > 0 && !validateCPF(cpf)) {
        const mensagem = 'CPF inválido.';
        erro.cpf = mensagem;
      }
    }
    if (telefonePrincipal === undefined || telefonePrincipal === '') {
      const mensagem = 'Telefone deve ser preenchido.';
      erro.telefonePrincipal = mensagem;
    }
    if (telefonePrincipal !== undefined) {
      if (telefonePrincipal.length > 0 && telefonePrincipal.length < 14) {
        const mensagem = 'Telefone inválido.';
        erro.telefonePrincipal = mensagem;
      }
    }
    if (telefoneSecundario !== undefined) {
      if (telefoneSecundario.length > 0 && telefoneSecundario.length < 14) {
        const mensagem = 'Telefone inválido.';
        erro.telefoneSecundario = mensagem;
      }
    }
    if (dataNascimento === undefined || dataNascimento === '') {
      const mensagem = 'Data de Nascimento deve ser preenchida.';
      erro.dataNascimento = mensagem;
    }
    if (dataNascimento !== undefined) {
      if (dataNascimento.length > 0 && !validateData(dataNascimento)) {
        const mensagem = 'Data inválida.';
        erro.dataNascimento = mensagem;
      }
    }
    if (genero === undefined) {
      const mensagem = 'Gênero deve ser selecionado.';
      erro.genero = mensagem;
    }
    if (idadeEscolar === undefined || idadeEscolar < 6) {
      const mensagem = 'Idade não permitida.';
      erro.idadeEscolar = mensagem;
    }
    return erro;
  };

  const validateIsValid = () => {
    if (matricula.nome !== undefined) {
      if (Object.keys(errors).length === 0) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  };

  // handles
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMatricula({ ...matricula, [name]: value });
  };

  const handleChangeRadio = (event) => {
    const label = event.target.labels[0].textContent;
    switch (event.target.name) {
      case 'genero':
        setMatricula({ ...matricula, genero: label });
        break;
      default:
        break;
    }
  };

  const handleChangePage = (val) => {
    switch (val) {
      case 2:
        history.push('/matricula2');
        break;
      case 3:
        history.push('/matricula3');
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

  }, []);

  useEffect(() => {
    if (matricula.cpf) {
      const mascaraCPF = cpfMask(matricula.cpf);
      setMatricula({ ...matricula, cpf: mascaraCPF });
    }
  }, [matricula.cpf]);

  useEffect(() => {
    if (matricula.dataNascimento && matricula.dataNascimento.length < 10) {
      // console.log(dateMask(matricula.dataNascimento));
      setMatricula({ ...matricula, dataNascimento: dateMask(matricula.dataNascimento), idadeEscolar: '0' });
    }
    if (matricula.dataNascimento !== undefined && matricula.dataNascimento.length === 10) {
      setMatricula({ ...matricula, dataNascimento: dateMask(matricula.dataNascimento), idadeEscolar: calculaIdadeEscolar(matricula.dataNascimento).toString() });
    } else if (matricula.dataNascimento !== undefined) {
      setMatricula({ ...matricula, dataNascimento: dateMask(matricula.dataNascimento), idadeEscolar: '0' });
    }
  }, [matricula.dataNascimento]);

  useEffect(() => {
    if (matricula.telefonePrincipal) {
      if (Object.keys(matricula.telefonePrincipal).length <= 14) {
        const mascaraTelefone = telefoneMask(matricula.telefonePrincipal);
        setMatricula({ ...matricula, telefonePrincipal: mascaraTelefone });
      } else {
        const mascaraCelular = celularMask(matricula.telefonePrincipal);
        setMatricula({ ...matricula, telefonePrincipal: mascaraCelular });
      }
    }
  }, [matricula.telefonePrincipal]);

  useEffect(() => {
    if (matricula.telefoneSecundario) {
      if (Object.keys(matricula.telefoneSecundario).length <= 14) {
        const mascaraTelefone = telefoneMask(matricula.telefoneSecundario);
        setMatricula({ ...matricula, telefoneSecundario: mascaraTelefone });
      } else {
        const mascaraCelular = celularMask(matricula.telefoneSecundario);
        setMatricula({ ...matricula, telefoneSecundario: mascaraCelular });
      }
    }
  }, [matricula.telefoneSecundario]);

  useEffect(() => {
    validateIsValid();
  }, [errors]);

  useEffect(() => {
    // if (matricula.nome) {
    setErrors(validate(matricula));
    // }
  }, [matricula]);

  console.log('Página 1', matricula);
  return (
    <>
      <div className="root">
        <Jumbotron className="jumbotron">
          <h2>Matrícula de Alunos</h2>
          <span>Identificação do Aluno</span>
        </Jumbotron>
        <div className="divider" />
        <Container>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={handleChangePage}>
          <ToggleButton className="btn-warning" value={1}>Identificação</ToggleButton>
          <ToggleButton className="btn-warning" disabled={!isValid} value={2}>Origem</ToggleButton>
          <ToggleButton className="btn-warning" disabled={!isValid} value={3}>Endereço</ToggleButton>
          <ToggleButton className="btn-warning" disabled={!isValid} value={4}>Matrícula</ToggleButton>
          <ToggleButton className="btn-warning" disabled={!isValid} value={5}>Procedência</ToggleButton>
        </ToggleButtonGroup>
        </Container>
        <Wrapper>
          <Form>
            <FormField
              label="Nome do Aluno"
              name="nome"
              type="text"
              value={matricula.nome}
              maxLength={200}
              onChange={handleChange}
              />
            {errors.nome && <MessageError>{errors.nome}</MessageError>}
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
            {errors.email && <MessageError>{errors.email}</MessageError>}
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
            {errors.cpf && <MessageError>{errors.cpf}</MessageError>}
            </div>
            </ContainerMultipleColumns>
            <ContainerMultipleColumns>
            <div style={{ width: '100%', margin: '0 5px 0 0' }}>
            <FormField
              label="Telefone (Principal)"
              name="telefonePrincipal"
              type="text"
              value={matricula.telefonePrincipal}
              maxLength={15}
              onChange={handleChange}
            />
            {errors.telefonePrincipal && <MessageError>{errors.telefonePrincipal}</MessageError>}
            </div>
            <div style={{ width: '100%', margin: '0 0 0 5px' }}>
            <FormField
              label="Telefone (Secundário)"
              name="telefoneSecundario"
              type="text"
              value={matricula.telefoneSecundario}
              maxLength={15}
              onChange={handleChange}
            />
            {errors.telefoneSecundario && <MessageError>{errors.telefoneSecundario}</MessageError>}
            </div>
            </ContainerMultipleColumns>
            <ContainerMultipleColumns>
            <div style={{ width: '100%', margin: '0 5px 0 0' }}>
            <FormField
              label="Data de Nascimento"
              name="dataNascimento"
              type="text"
              value={matricula.dataNascimento}
              maxLength={10}
              onChange={handleChange}
            />
            {errors.dataNascimento && <MessageError>{errors.dataNascimento}</MessageError>}
            </div>
            <div style={{ width: '100%', margin: '0 0 0 5px' }}>
            <FormField
            label="Idade Escolar"
            name="idadeEscolar"
            type="text"
            value={matricula.idadeEscolar === undefined ? '0' : matricula.idadeEscolar}
            maxLength={3}
            onChange={handleChange}
            disabled
          />
          {errors.idadeEscolar && <MessageError>{errors.idadeEscolar}</MessageError>}
            </div>
            </ContainerMultipleColumns>
            <fieldset style={{ marginTop: '5px' }}>
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
              {errors.genero && <MessageError>{errors.genero}</MessageError>}
            </fieldset>
            <ButtonContainer>
              <Link to="/listagemGeral">
                <Buttons variant="danger">Cancelar</Buttons>
              </Link>
              <Link to="/matricula2">
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
