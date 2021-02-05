/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
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
  ContainerMultipleColumns, MessageError, BorderLabel,
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
  const { matricula, setMatricula } = useMatricula({ });
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

  const validateData = (elementValue) => {
    const dataPattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return dataPattern.test(elementValue);
  };

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
    if (nacionalidade === undefined) {
      const mensagem = 'Nacionalidade deve ser selecionada.';
      erro.nacionalidade = mensagem;
    }
    if (naturalidadeUF !== undefined) {
      if (nacionalidade === 'Brasileira' && naturalidadeUF === '') {
        const mensagem = 'Selecione um Estado.';
        erro.naturalidadeUF = mensagem;
      }
    }
    if (naturalidade !== undefined) {
      if (nacionalidade === 'Brasileira' && naturalidade === '') {
        const mensagem = 'Selecione um Município.';
        erro.naturalidadeUF = mensagem;
      }
    }
    if (nomeMae !== undefined) {
      if (nomeMae === '') {
        const mensagem = 'Nome da Mãe deve ser preenchido.';
        erro.nomeMae = mensagem;
      }
    }
    if (responsavel !== undefined) {
      if (responsavel === '') {
        const mensagem = 'Responsável deve ser preenchido.';
        erro.responsavel = mensagem;
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
    setMatricula({ ...matricula, [name]: value });
  };

  const handleChangeSelect = (event) => {
    const { value, label } = event;
    let tipo;
    if (label.length === 2) tipo = 'naturalidadeUF';
    if (label.length > 2) tipo = 'naturalidade';
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
      case 'grauParentesco':
        setMatricula({ ...matricula, grauParentesco: label });
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

    // setEstadosOptions(estados.map((estado) => (
    //   {
    //     value: estado.id,
    //     label: `${estado.nome} (${estado.sigla})`,
    //   }
    // )));
    setMatricula({ ...matricula, dataHora: dataAtual });
  }, []);

  useEffect(() => {
    if (matricula.nacionalidade !== undefined) {
      if (matricula.nacionalidade === 'Brasileira') {
        setEstadosOptions(estados.map((estado) => (
          {
            value: estado.id,
            label: `${estado.sigla}`,
            // label: `${estado.nome} (${estado.sigla})`,
          }
        )));
      } else {
        setMatricula({ ...matricula,
          naturalidadeUF: '',
          naturalidade: '',
          codigoNaturalidadeUF: '',
          codigoNaturalidade: '',
        });
      }
    }
  }, [matricula.nacionalidade]);

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
        label: `${cidade.nome}`,
        // label: `${cidade.nome} - ${cidade.microrregiao.mesorregiao.UF.sigla}`,
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
      setMatricula({ ...matricula, grauParentesco: '' });
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
          {/* <BorderLabel className="borderLabel">
          <Label>Dados Pessoais:</Label> */}
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
            {errors.dataNascimento && <MessageError>{errors.dataNascimento}</MessageError>}
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
              {errors.genero && <MessageError>{errors.genero}</MessageError>}
            </fieldset>
          {/* </BorderLabel> */}
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
              {errors.nacionalidade && <MessageError>{errors.nacionalidade}</MessageError>}
            </fieldset>
            { matricula.nacionalidade === 'Brasileira' && (
            <ContainerMultipleColumns>
            <div style={{ width: '45%', margin: '0 5px 0 0' }}>
            <FormSelect
              label="Estado de Origem:"
              name="naturalidadUF"
              value={matricula.codigoNaturalidadeUF}
              onChange={handleChangeSelect}
              options={estadosOptions}
            />
            </div>
            )
            {errors.codigoNaturalidadeUF && <MessageError>{errors.codigoNaturalidadeUF}</MessageError>}
            { matricula.codigoNaturalidadeUF && (
              <div style={{ width: '100%', margin: '0 5px 0 0' }}>
            <FormSelect
              label="Cidade de Origem:"
              name="naturalidade"
              value={matricula.codigoNaturalidade}
              onChange={handleChangeSelect}
              options={cidadesOptions}
            />
              </div>
            )}
            (
            </ContainerMultipleColumns>
            )}
            <FormField
              label="Nome do Pai"
              name="nomePai"
              type="text"
              value={matricula.nomePai}
              maxLength={300}
              onChange={handleChange}
            />
            {errors.nomePai && <MessageError>{errors.nomePai}</MessageError>}
            <FormField
              label="Nome do Mãe"
              name="nomeMae"
              type="text"
              value={matricula.nomeMae}
              maxLength={300}
              onChange={handleChange}
            />
            {errors.nomeMae && <MessageError>{errors.nomeMae}</MessageError>}
            <FormField
              label="Responsável"
              name="responsavel"
              type="text"
              value={matricula.responsavel}
              maxLength={300}
              onChange={handleChange}
            />
            {errors.responsavel && <MessageError>{errors.responsavel}</MessageError>}
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
                    checked={matricula.grauParentesco === 'Mãe/Pai'}
                    name="grauParentesco"
                    id="inline-grauParentesco-1"
                    value="1"
                    onChange={handleChangeRadio}
                  />
                  <Form.Check
                    inline
                    label="Avô/Avó"
                    type="radio"
                    checked={matricula.grauParentesco === 'Avô/Avó'}
                    name="grauParentesco"
                    id="inline-grauParentesco-2"
                    value="2"
                    onChange={handleChangeRadio}
                  />
                  <Form.Check
                    inline
                    label="Tio/Tia"
                    type="radio"
                    checked={matricula.grauParentesco === 'Tio/Tia'}
                    name="grauParentesco"
                    id="inline-grauParentesco-3"
                    value="3"
                    onChange={handleChangeRadio}
                  />
                  <Form.Check
                    inline
                    label="o(a) próprio(a)"
                    type="radio"
                    checked={matricula.grauParentesco === 'o(a) próprio(a)'}
                    name="grauParentesco"
                    id="inline-grauParentesco-4"
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
