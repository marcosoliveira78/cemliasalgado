/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Form, Jumbotron } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import uniqueId from 'lodash';
import cpfMask from '../../component/mask/cpf/index';
import FormField from '../../component/FormField';
import {
  ButtonContainer, Wrapper, Buttons, ContainerAlignLeft,
  ContainerMultipleColumns, MessageError,
} from '../styles';
import { Label } from '../../component/FormSelect/styles';
import ShowMessage from '../../services/toast';
import dateMask from '../../component/mask/data';
import telefoneMask from '../../component/mask/telefone';
import celularMask from '../../component/mask/celular';
import convertDate from '../../component/Convert/Date';
import { validateEmail, validateCPF, validateData } from '../../component/Validate';
import { useMatricula } from '../../context/Matricula';

const Matricula = () => {
  // variables
  const urlBd = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://cemliasalgado.herokuapp.com';
  const pasta = 'matriculas';
  const history = useHistory();
  let nextId;
  const now = new Date();

  // hooks
  const { matricula, setMatricula } = useMatricula({ });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  // Functions

  const dataAtual = convertDate(now);

  //  Validations
  const validate = (data) => {
    const { nome, email, cpf, telefonePrincipal,
      telefoneSecundario, dataNascimento, genero,
      nacionalidade, naturalidade, naturalidadeUF,
      nomePai, nomeMae, responsavel, grauParentesco,
    } = data;
    const erro = {};
    if (nome !== undefined) {
      if (nome === '') {
        const mensagem = 'Nome do Aluno deve ser preenchido.';
        erro.nome = mensagem;
      }
    }
    if (email !== undefined) {
      if (email === '') {
        const mensagem = 'E-mail deve ser preenchido.';
        erro.email = mensagem;
      }
      if (email.length > 0 && !validateEmail(email)) {
        const mensagem = 'E-mail inválido.';
        erro.email = mensagem;
      }
    }
    if (cpf !== undefined) {
      if (cpf.length > 0 && !validateCPF(cpf)) {
        const mensagem = 'CPF inválido.';
        erro.cpf = mensagem;
      }
    }
    if (telefonePrincipal !== undefined) {
      if (telefonePrincipal === '') {
        const mensagem = 'Telefone deve ser preenchido.';
        erro.telefonePrincipal = mensagem;
      }
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
    if (dataNascimento !== undefined) {
      if (dataNascimento === '') {
        const mensagem = 'Data de Nascimento deve ser preenchida.';
        erro.dataNascimento = mensagem;
      }
      if (dataNascimento.length > 0 && !validateData(dataNascimento)) {
        const mensagem = 'Data inválida.';
        erro.dataNascimento = mensagem;
      }
    }
    if (genero === undefined) {
      const mensagem = 'Gênero deve ser selecionado.';
      erro.genero = mensagem;
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

  // const handleSubmit = async (form) => {
  //   form.preventDefault();
  //   fetch(`${urlBd}/${pasta}`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       mode: 'cors',
  //       cache: 'default',
  //       body: JSON.stringify({
  //         id: nextId,
  //         nome: matricula.nome,
  //         cpf: matricula.cpf,
  //         dataNascimento: matricula.dataNascimento,
  //         email: matricula.email,
  //         genero: matricula.genero,
  //         nacionalidade: matricula.nacionalidade,
  //         naturalidade: matricula.naturalidade,
  //         naturalidadeUF: matricula.naturalidadeUF,
  //         status: 'A',
  //       }),
  //     })
  //     .then(async (resp) => {
  //       if (resp.ok) {
  //         ShowMessage('success', 'Cadastro efetuado com sucesso', 5000, uniqueId());
  //         history.push('/listagemGeral');
  //       }
  //     });
  // };

  // Triggers
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

    setMatricula({ ...matricula, dataHora: dataAtual });
  }, []);

  useEffect(() => {
    if (matricula.cpf) {
      const mascaraCPF = cpfMask(matricula.cpf);
      setMatricula({ ...matricula, cpf: mascaraCPF });
    }
  }, [matricula.cpf]);

  useEffect(() => {
    if (matricula.dataNascimento) {
      const mascaraDataNascimento = dateMask(matricula.dataNascimento);
      setMatricula({ ...matricula, dataNascimento: mascaraDataNascimento });
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
    if (matricula.dataHora) {
      setErrors(validate(matricula));
    }
  }, [matricula]);

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
            <FormField
              label="Data de Nascimento"
              name="dataNascimento"
              type="text"
              value={matricula.dataNascimento}
              maxLength={10}
              onChange={handleChange}
            />
            {errors.dataNascimento && <MessageError>{errors.dataNascimento}</MessageError>}
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
