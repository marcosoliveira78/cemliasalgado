/* eslint-disable no-console */
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
import FormDatePicker from '../../component/FormDatePicker';
import {
  ButtonContainer, Wrapper, Buttons, ContainerAlignLeft,
  ContainerMultipleColumns, MessageError,
} from '../styles';
import { Label } from '../../component/FormSelect/styles';
import ShowMessage from '../../services/toast';
import dateMask from '../../component/mask/data';
import telefoneMask from '../../component/mask/telefone';
import celularMask from '../../component/mask/celular';
import { useMatricula } from '../../context/matricula';

const Matricula = () => {
  // variables
  const urlBd = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://cemliasalgado.herokuapp.com';
  const pasta = 'matriculas';
  const history = useHistory();
  let nextId;
  const now = new Date();
  // const dataAtual = `${now.getDay()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  // hooks
  const { matricula, setMatricula } = useMatricula({});
  const [estadosOptions, setEstadosOptions] = useState([]);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [cidades, setCidades] = useState([]);
  // const [startDate, setStartDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  // Functions

  // Conversions
  const convertDate = (data) => {
    const date = new Date(data);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hour = (`0${(date.getHours() % 60)}`).slice(-2);
    const minutes = (`0${(date.getMinutes() % 60)}`).slice(-2);
    const seconds = (`0${(date.getSeconds() % 60)}`).slice(-2);

    return (`${day}/${month}/${year} ${hour}:${minutes}:${seconds}`);
  };

  const validateEmail = (elementValue) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  };

  const validateCPF = (CPF) => {
    const strCPF = CPF.replace(/\D/g, '');
    let Soma = 0;
    let Resto;
    if (strCPF === '00000000000') return false;

    for (let i = 1; i <= 9; i++) Soma += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10), 10)) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11), 10)) return false;
    return true;
  };

  const dataAtual = convertDate(now);
  console.log(dataAtual);

  //  Validations
  const validate = (data) => {
    const { nome, email, cpf, telefonePrincipal,
      telefoneSecundario, dataNascimento, genero,
      nacionalidade, naturalidade, naturalidadeUF,
      nomePai, nomeMae, responsavel, parentesco,
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
        const mensagem = 'e-mail inválido.';
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
    // if (nomeItem !== undefined) {
    //   if (nomeItem.length > 0 && nomeItem.length < 3) {
    //     const mensagem = 'Mínimo 3 caracteres.';
    //     erro.nomeItem = mensagem;
    //   }
    //   if (nomeItem === '') {
    //     const mensagem = 'O campo Nome do Item deve ser preenchido.';
    //     erro.nomeItem = mensagem;
    //   }
    // }
    // if (caminhoImagemFundo !== undefined) {
    //   if (caminhoImagemFundo.split('.')[1] !== undefined) {
    //     switch (caminhoImagemFundo.split('.')[1].toUpperCase()) {
    //       case 'JPG': case 'JPEG': case 'PNG': case 'BMP': case 'GIF': case 'SVG': case 'TIF':
    //         break;
    //       default:
    //         {
    //           const mensagem = 'O campo Imagem de Fundo deve conter uma extensão válida.';
    //           erro.caminhoImagemFundo = mensagem;
    //         }
    //         break;
    //     }
    //   }
    //   if (caminhoImagemFundo.split('.')[1] === '' || caminhoImagemFundo.split('.')[1] === undefined) {
    //     const mensagem = 'O campo Imagem de Fundo deve conter uma extensão.';
    //     erro.caminhoImagemFundo = mensagem;
    //   }
    //   if (caminhoImagemFundo.split('.')[0].length < 3) {
    //     const mensagem = 'O nome da Imagem de Fundo deve conter no mínimo 3 caracteres.';
    //     erro.caminhoImagemFundo = mensagem;
    //   }
    //   if (caminhoImagemFundo === '') {
    //     const mensagem = 'O campo Imagem de Fundo deve ser preenchido.';
    //     erro.caminhoImagemFundo = mensagem;
    //   }
    // }
    // if (ordemExibicaoItem !== undefined) {
    //   if (ordemExibicaoItem === 0) {
    //     const mensagem = 'Uma Ordem de Exibição deve ser selecionada.';
    //     erro.ordemExibicaoItem = mensagem;
    //   }
    // }
    // if (tags !== undefined && tags !== null) {
    //   if (tags.length > 0 && tags.length < 3) {
    //     const mensagem = 'Mínimo 3 caracteres.';
    //     erro.tags = mensagem;
    //   }
    //   if (tags === '') {
    //     const mensagem = 'O campo Palavras-Chave deve ser preenchido.';
    //     erro.tags = mensagem;
    //   }
    // }
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
    setMatricula({ ...matricula, dataHora: dataAtual });
  }, []);

  // Triggers
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
    if (matricula.responsavel === '') {
      setMatricula({ ...matricula, parentesco: '' });
    }
  }, [matricula.responsavel]);

  useEffect(() => {
    validateIsValid();
  }, [errors]);

  useEffect(() => {
    if (matricula.dataHora) {
      setErrors(validate(matricula));
    }
  }, [matricula]);

  console.log('Responsavel:', matricula.responsavel);
  console.log('Parentesco:', matricula.parentesco);
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
            {/* <ContainerMultipleColumns>
            <div style={{ width: '100%', margin: '0 5px 0 0' }}> */}
            <FormField
              label="Data de Nascimento"
              name="dataNascimento"
              type="text"
              value={matricula.dataNascimento}
              maxLength={10}
              onChange={handleChange}
            />
            {/* <FormDatePicker
            label="Data de Nascimento"
            selected={startDate}
            onChange={(date) => setStartDate(date)} /> */}
            {/* </div>
            <div style={{ width: '100%', margin: '0 0 0 5px' }}> */}
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
              {/* {errors.tipoSolicitacao && <MessageError>{errors.tipoSolicitacao}</MessageError>} */}
            </fieldset>
            {/* </div>
            </ContainerMultipleColumns> */}
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
            {/* {errors.tags && <MessageError>{errors.tags}</MessageError>} */}

            <ButtonContainer>
              <Link to="/listagemGeral">
                <Buttons variant="danger">Cancelar</Buttons>
              </Link>
              <Buttons
                // type="submit"
                variant="success"
                disabled={!isValid}>
                Próxima
              </Buttons>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </div>
    </>
  );
};

export default Matricula;
