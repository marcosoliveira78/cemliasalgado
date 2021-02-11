/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Jumbotron } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import uniqueId from 'lodash';
import FormField from '../../../component/FormField';
import {
  ButtonContainer, Wrapper, Buttons,
  ContainerMultipleColumns, MessageError,
} from '../../styles';
import convertDate from '../../../component/Convert/Date';
import { validateEmail, validateSenha } from '../../../component/Validate';
import FormSwitch from '../../../component/FormSwitch';
import loginMask from '../../../component/mask/login';
import ShowMessage from '../../../services/toast';
import encryptPass from '../../../component/Convert/Encrypt';
import decryptPass from '../../../component/Convert/Decrypt';

const UsuarioForm = ({ match }) => {
  // variables
  const urlBd = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://cemliasalgado.herokuapp.com';

  const pasta = 'usuarios';
  const history = useHistory();
  let nextId;
  const now = new Date();
  const { params } = match;
  const { status } = params;
  let isChecked = status !== undefined ? status === 'A' : undefined;

  // hooks
  const [usuario, setUsuario] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [listaUsuarios, setListaUsuarios] = useState({});

  // Gets
  const getSwitchValue = (value) => {
    isChecked = value;
    setUsuario({ ...usuario, status: isChecked ? 'A' : 'I' });
    return isChecked;
  };

  // Functions

  const dataAtual = convertDate(now);

  //  Validations
  const validate = (data) => {
    const { nome, login, email, password, confirmPass,
    } = data;
    const erro = {};
    let mensagem;
    if (nome !== undefined) {
      if (nome === '') {
        mensagem = 'Nome do Usuário deve ser preenchido.';
        erro.nome = mensagem;
      }
    }
    if (login !== undefined) {
      if (login === '') {
        mensagem = 'Nome de Login deve ser preenchido.';
        erro.login = mensagem;
      }
      if (login.length < 6) {
        mensagem = 'Nome de Login deve possuir no mínimo 6 caracteres.';
        erro.login = mensagem;
      }
      if (login.length >= 6) {
        let existe;
        if (params.id === undefined) {
          existe = listaUsuarios.filter((u) => u.usuario === login);
        } else {
          existe = listaUsuarios.filter((u) => (u.usuario === login && u.id.toString() !== params.id));
        }
        if (existe.length > 0) {
          mensagem = 'Nome de login já utilizado.';
          erro.login = mensagem;
        }
      }
    }
    if (email !== undefined) {
      if (email === '') {
        mensagem = 'E-mail deve ser preenchido.';
        erro.email = mensagem;
      }
      if (email.length > 0 && !validateEmail(email)) {
        mensagem = 'E-mail inválido.';
        erro.email = mensagem;
      }
    }
    if (password !== undefined) {
      if (password === '') {
        mensagem = 'Senha deve ser preenchida.';
        erro.password = mensagem;
      }
      if (password.length < 8) {
        mensagem = 'Senha deve possuir no mínimo 8 caracteres.';
        erro.password = mensagem;
      }
      if (!validateSenha(password)) {
        mensagem = 'Senhas inválida.';
        erro.password = mensagem;
      }
    }
    if (confirmPass !== undefined) {
      if (confirmPass === '') {
        mensagem = 'Confirmação de senha deve ser preenchida.';
        erro.confirmPass = mensagem;
      }
    }
    if (password !== undefined && confirmPass !== undefined) {
      if (confirmPass !== '') {
        if (password !== confirmPass) {
          mensagem = 'Confirmação de senha diferente da senha.';
          erro.confirmPass = mensagem;
        }
      }
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
    setUsuario({ ...usuario, [name]: value });
  };

  const handleChangeLogin = (event) => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: loginMask(value) });
  };

  const handleSubmit = async (form) => {
    form.preventDefault();
    let metodo = 'POST';
    let url = `${urlBd}/${pasta}`;
    if (params.id !== undefined)
    {
      metodo = 'PUT';
      url = `${urlBd}/${pasta}/${params.id}`;
    }

    fetch(url,
      {
        method: metodo,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          id: usuario.id,
          nome: usuario.nome,
          usuario: usuario.login,
          email: usuario.email,
          password: encryptPass(usuario.password),
          status: usuario.status,
        }),
      })
      .then(async (resp) => {
        if (resp.ok) {
          ShowMessage('success', 'Cadastro efetuado com sucesso', 5000, uniqueId());
          history.push('/usuario');
        }
      });
  };

  // Triggers
  useEffect(() => {
    fetch(`${urlBd}/${pasta}`)
      .then(async (resp) => {
        const resultado = await resp.json();
        setListaUsuarios(resultado);
        if (params.id === undefined) {
          const lastKey = Object.keys(resultado).reverse()[0];
          nextId = resultado[lastKey].id + 1;
          setUsuario({ ...usuario, id: nextId });
        }
      });
    if (params.id !== undefined) {
      fetch(`${urlBd}/${pasta}/${params.id}`).then(async (resp) => {
        const resultado = await resp.json();
        const data = {
          id: resultado.id,
          nome: resultado.nome,
          login: resultado.usuario,
          email: resultado.email,
          password: decryptPass(resultado.password),
          confirmPass: decryptPass(resultado.password),
          status: resultado.status,
        };
        setUsuario(data);
      });
    }
  }, []);

  useEffect(() => {
    validateIsValid();
  }, [errors]);

  useEffect(() => {
    if (usuario.id) {
      setErrors(validate(usuario));
    }
  }, [usuario]);

  //   console.log('Usuario: ', usuario);

  return (
    <>
      <div className="root">
        <Jumbotron className="jumbotron">
          <h2>Configuração de Usuários</h2>
          <span>Formulário de configuração de usuários.</span>
        </Jumbotron>
        <div className="divider" />

        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <FormField
              label="Nome Completo"
              name="nome"
              type="text"
              value={usuario.nome}
              maxLength={200}
              onChange={handleChange}
              />
            {errors.nome && <MessageError>{errors.nome}</MessageError>}
            <ContainerMultipleColumns>
            <div style={{ width: '100%', margin: '0 5px 0 0' }}>
            <FormField
              label="Nome de Login"
              name="login"
              type="text"
              value={usuario.login}
              maxLength={25}
              onChange={handleChangeLogin}
            />
            {errors.login && <MessageError>{errors.login}</MessageError>}
            </div>
            <div style={{ width: '100%', margin: '0 0 0 5px' }}>
            <FormField
              label="E-mail"
              name="email"
              type="text"
              value={usuario.email}
              maxLength={200}
              onChange={handleChange}
            />
            {errors.email && <MessageError>{errors.email}</MessageError>}
            </div>
            </ContainerMultipleColumns>
            <ContainerMultipleColumns>
            <div style={{ width: '100%', margin: '0 5px 0 0' }}>
            <FormField
              label="Senha"
              name="password"
              type="password"
              value={usuario.password}
              maxLength={15}
              onChange={handleChange}
            />
            {errors.password && <MessageError>{errors.password}</MessageError>}
            </div>
            <div style={{ width: '100%', margin: '0 0 0 5px' }}>
            <FormField
              label="Confirmação"
              name="confirmPass"
              type="password"
              value={usuario.confirmPass}
              maxLength={15}
              onChange={handleChange}
            />
            {errors.confirmPass && <MessageError>{errors.confirmPass}</MessageError>}
            </div>
            </ContainerMultipleColumns>
            {errors.password && (
                <Card style={{ marginTop: '15px', fontSize: '10px', color: '#5d5d5d', backgroundColor: 'transparent' }}>
                <Card.Body style={{ padding: '5px 5px 0 5px' }}>
                  <Card.Title style={{ fontSize: '12px', marginBottom: '0' }}>Orientações para senha:</Card.Title>
                  <Card.Text style={{ padding: '0 0 0 20px' }}>
                    Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial
                  </Card.Text>
                </Card.Body>
                </Card>
            )}
            <FormSwitch
              name="status"
              checked={isChecked}
              label="Status:"
              labelInline
              getValue={(checked) => getSwitchValue(checked)}
              onChange={getSwitchValue} />
            <ButtonContainer>
              <Link to="/usuario">
                <Buttons variant="danger">Cancelar</Buttons>
              </Link>
              <Buttons
                type="submit"
                variant="success"
                disabled={!isValid}>
                Enviar
              </Buttons>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </div>
    </>
  );
};

export default UsuarioForm;
