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
import distritos from '../../repositories/distritos.json';
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
import { useMatricula } from '../../context/matricula';
import cepMask from '../../component/mask/cep';

const Matricula = () => {
  // variables
  const urlBd = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://cemliasalgado.herokuapp.com';
  const urlCEP = 'https://viacep.com.br/';
  const pasta = 'matriculas';
  const history = useHistory();
  let nextId;
  const now = new Date();
  // const dataAtual = `${now.getDay()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  // hooks
  const { matricula, setMatricula } = useMatricula({});
  const [estadosOptions, setEstadosOptions] = useState([]);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [distritosOptions, setDistritosOptions] = useState([]);
  const [cidades, setCidades] = useState([]);
  // const [startDate, setStartDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  // Functions
  // Conversions
  // const convertDate = (data) => {
  //   const date = new Date(data);

  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();
  //   const hour = (`0${(date.getHours() % 60)}`).slice(-2);
  //   const minutes = (`0${(date.getMinutes() % 60)}`).slice(-2);
  //   const seconds = (`0${(date.getSeconds() % 60)}`).slice(-2);

  //   return (`${day}/${month}/${year} ${hour}:${minutes}:${seconds}`);
  // };

  // const validateEmail = (elementValue) => {
  //   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   return emailPattern.test(elementValue);
  // };

  // const validateCPF = (CPF) => {
  //   const strCPF = CPF.replace(/\D/g, '');
  //   let Soma = 0;
  //   let Resto;
  //   if (strCPF === '00000000000') return false;

  //   for (let i = 1; i <= 9; i++) Soma += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
  //   Resto = (Soma * 10) % 11;

  //   if ((Resto === 10) || (Resto === 11)) Resto = 0;
  //   if (Resto !== parseInt(strCPF.substring(9, 10), 10)) return false;

  //   Soma = 0;
  //   for (let i = 1; i <= 10; i++) Soma += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
  //   Resto = (Soma * 10) % 11;

  //   if ((Resto === 10) || (Resto === 11)) Resto = 0;
  //   if (Resto !== parseInt(strCPF.substring(10, 11), 10)) return false;
  //   return true;
  // };

  // const validateData = (elementValue) => {
  //   const dataPattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  //   return dataPattern.test(elementValue);
  // };

  // const dataAtual = convertDate(now);

  //  Validations
  const validate = (data) => {
    const {
      cep,
      logradouro,
      numero,
      bairro,
      distrito,
      municipio,
      uf,
    } = data;
    const erro = {};
    if (cep !== undefined) {
      if (cep === '') {
        const mensagem = 'CEP deve ser preenchido.';
        erro.cep = mensagem;
      }
    }
    if (logradouro !== undefined) {
      if (logradouro === '') {
        const mensagem = 'Logradouro deve ser preenchido.';
        erro.logradouro = mensagem;
      }
    }
    if (numero !== undefined) {
      if (numero === '') {
        const mensagem = 'Nº deve ser preenchido.';
        erro.numero = mensagem;
      }
    }
    if (bairro !== undefined) {
      if (bairro === '') {
        const mensagem = 'Bairro deve ser preenchido.';
        erro.bairro = mensagem;
      }
    }
    if (municipio === undefined) {
      const mensagem = 'Município deve ser selecionado.';
      erro.municipio = mensagem;
    }
    if (uf === undefined) {
      const mensagem = 'Estado deve ser selecionado.';
      erro.uf = mensagem;
    }
    // if (cpf !== undefined) {
    //   if (cpf.length > 0 && !validateCPF(cpf)) {
    //     const mensagem = 'CPF inválido.';
    //     erro.cpf = mensagem;
    //   }
    // }
    // if (telefonePrincipal !== undefined) {
    //   if (telefonePrincipal === '') {
    //     const mensagem = 'Telefone deve ser preenchido.';
    //     erro.telefonePrincipal = mensagem;
    //   }
    //   if (telefonePrincipal.length > 0 && telefonePrincipal.length < 14) {
    //     const mensagem = 'Telefone inválido.';
    //     erro.telefonePrincipal = mensagem;
    //   }
    // }
    // if (telefoneSecundario !== undefined) {
    //   if (telefoneSecundario.length > 0 && telefoneSecundario.length < 14) {
    //     const mensagem = 'Telefone inválido.';
    //     erro.telefoneSecundario = mensagem;
    //   }
    // }
    // if (dataNascimento !== undefined) {
    //   if (dataNascimento === '') {
    //     const mensagem = 'Data de Nascimento deve ser preenchida.';
    //     erro.dataNascimento = mensagem;
    //   }
    //   if (dataNascimento.length > 0 && !validateData(dataNascimento)) {
    //     const mensagem = 'Data inválida.';
    //     erro.dataNascimento = mensagem;
    //   }
    // }
    // if (genero === undefined) {
    //   const mensagem = 'Gênero deve ser selecionado.';
    //   erro.genero = mensagem;
    // }
    // if (nacionalidade === undefined) {
    //   const mensagem = 'Nacionalidade deve ser selecionada.';
    //   erro.nacionalidade = mensagem;
    // }
    // if (naturalidadeUF !== undefined) {
    //   if (nacionalidade === 'Brasileira' && naturalidadeUF === '') {
    //     const mensagem = 'Selecione um Estado.';
    //     erro.naturalidadeUF = mensagem;
    //   }
    // }
    // if (naturalidade !== undefined) {
    //   if (nacionalidade === 'Brasileira' && naturalidade === '') {
    //     const mensagem = 'Selecione um Município.';
    //     erro.naturalidadeUF = mensagem;
    //   }
    // }
    // if (nomeMae !== undefined) {
    //   if (nomeMae === '') {
    //     const mensagem = 'Nome da Mãe deve ser preenchido.';
    //     erro.nomeMae = mensagem;
    //   }
    // }
    // if (responsavel !== undefined) {
    //   if (responsavel === '') {
    //     const mensagem = 'Responsável deve ser preenchido.';
    //     erro.responsavel = mensagem;
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

  // Triggers
  useEffect(() => {
    if (!matricula.nome) {
      history.push('/matricula');
    }

    setEstadosOptions(estados.map((estado) => (
      {
        value: estado.id,
        label: `${estado.sigla}`,
        // label: `${estado.nome} (${estado.sigla})`,
      }
    )));
    // setMatricula({ ...matricula, dataHora: dataAtual });
  }, []);

  // useEffect(() => {
  //   if (matricula.nacionalidade !== undefined) {
  //     if (matricula.nacionalidade === 'Brasileira') {
  //       setEstadosOptions(estados.map((estado) => (
  //         {
  //           value: estado.id,
  //           label: `${estado.nome} (${estado.sigla})`,
  //         }
  //       )));
  //     } else {
  //       setMatricula({ ...matricula,
  //         naturalidadeUF: '',
  //         naturalidade: '',
  //         codigoNaturalidadeUF: '',
  //         codigoNaturalidade: '',
  //       });
  //     }
  //   }
  // }, [matricula.nacionalidade]);

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
        // label: `${cidade.nome} - ${cidade.microrregiao.mesorregiao.UF.sigla}`,
      }
    )));
  }, [cidades]);

  useEffect(() => {
    if (matricula.cep) {
      const mascaraCEP = cepMask(matricula.cep);
      setMatricula({ ...matricula, cep: mascaraCEP });
      if (matricula.cep.length === 10) {
        const cepUnmask = matricula.cep.replace(/\D/g, '');
        fetch(`${urlCEP}/ws/${cepUnmask}/json`,
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
                codigoUf: codigoUF[0].id,
                uf: resultado.uf,
              });
            }
          });
      }
    }
  }, [matricula.cep]);

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

  // useEffect(() => {
  //   if (matricula.telefonePrincipal) {
  //     if (Object.keys(matricula.telefonePrincipal).length <= 14) {
  //       const mascaraTelefone = telefoneMask(matricula.telefonePrincipal);
  //       setMatricula({ ...matricula, telefonePrincipal: mascaraTelefone });
  //     } else {
  //       const mascaraCelular = celularMask(matricula.telefonePrincipal);
  //       setMatricula({ ...matricula, telefonePrincipal: mascaraCelular });
  //     }
  //   }
  // }, [matricula.telefonePrincipal]);

  // useEffect(() => {
  //   if (matricula.telefoneSecundario) {
  //     if (Object.keys(matricula.telefoneSecundario).length <= 14) {
  //       const mascaraTelefone = telefoneMask(matricula.telefoneSecundario);
  //       setMatricula({ ...matricula, telefoneSecundario: mascaraTelefone });
  //     } else {
  //       const mascaraCelular = celularMask(matricula.telefoneSecundario);
  //       setMatricula({ ...matricula, telefoneSecundario: mascaraCelular });
  //     }
  //   }
  // }, [matricula.telefoneSecundario]);

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

  console.log(matricula);
  console.log('UF: ', matricula.uf);
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
          <BorderLabel className="borderLabel">
          <Label>Endereço:</Label>
            <ContainerMultipleColumns>
            <div style={{ width: '35%', margin: '0 5px 0 0' }}>
            <FormField
                label="CEP"
                name="cep"
                type="text"
                value={matricula.cep}
                maxLength={10}
                onChange={handleChange}
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
            <div style={{ width: '100%', margin: '0 5px 0 0' }}>
            <FormSelect
              label="Município:"
              name="municipio"
              value={matricula.codigoMunicipio}
              onChange={handleChangeSelect}
              options={cidadesOptions}
            />
            {errors.municipio && <MessageError>{errors.municipio}</MessageError>}
            </div>
            <div style={{ width: '50%', margin: '0 0 0 5px' }}>
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
              label="Distrito:"
              name="distrito"
              value={matricula.codigoDistrito}
              onChange={handleChangeSelect}
              options={distritosOptions}
            />
            {errors.distrito && <MessageError>{errors.distrito}</MessageError>}
            </div>
            </ContainerMultipleColumns>
            {/* <FormField
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
            <FormSelect
              label="Naturalidade: (Estado de Origem)"
              name="naturalidadUF"
              value={matricula.codigoNaturalidadeUF}
              onChange={handleChangeSelect}
              options={estadosOptions}
            />
            )}
            {errors.codigoNaturalidadeUF && <MessageError>{errors.codigoNaturalidadeUF}</MessageError>}
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
            </fieldset>
            )} */}
            {/* {errors.tipoSolicitacao && <MessageError>{errors.tipoSolicitacao}</MessageError>} */}
            {/* {errors.nomeItem && <MessageError>{errors.nomeItem}</MessageError>} */}
            {/* {errors.tags && <MessageError>{errors.tags}</MessageError>} */}

          </BorderLabel>
            <ButtonContainer>
              <Link to="/Matricula">
                <Buttons variant="danger"> Voltar </Buttons>
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
