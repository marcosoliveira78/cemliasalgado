/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { Col, Form, Jumbotron, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import estados from '../../repositories/estados.json';
import municipios from '../../repositories/municipios.json';
import FormSelect from '../../component/FormSelect';
import FormField from '../../component/FormField';
import {
  ButtonContainer, Wrapper, Buttons, ContainerAlignLeft,
  ContainerMultipleColumns, MessageError, Container,
} from '../styles';
import { Label } from '../../component/FormSelect/styles';
import { useMatricula } from '../../context/matricula';

const Matricula = () => {
  // variables
  const history = useHistory();

  // hooks
  const { matricula, setMatricula } = useMatricula({ });
  const [estadosOptions, setEstadosOptions] = useState([]);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  // Functions

  //  Validations
  const validate = (data) => {
    const {
      nacionalidade, naturalidade, naturalidadeUF,
      nomeMae, responsavel, grauParentesco,
    } = data;
    const erro = {};
    if (nacionalidade === undefined) {
      const mensagem = 'Nacionalidade deve ser selecionada.';
      erro.nacionalidade = mensagem;
    }
    if (nacionalidade === 'Brasileira') {
      if (naturalidadeUF === undefined || naturalidadeUF === '') {
        const mensagem = 'Selecione um Estado.';
        erro.naturalidadeUF = mensagem;
      }
      if (naturalidade === undefined || naturalidade === '') {
        const mensagem = 'Selecione um Município.';
        erro.naturalidade = mensagem;
      }
    }
    if (nomeMae === undefined || nomeMae === '') {
      const mensagem = 'Nome da Mãe deve ser preenchido.';
      erro.nomeMae = mensagem;
    }
    if (responsavel === undefined || responsavel === '') {
      const mensagem = 'Responsável deve ser preenchido.';
      erro.responsavel = mensagem;
    }
    if (grauParentesco === undefined || grauParentesco === '') {
      const mensagem = 'Parentesco deve ser selecionado.';
      erro.grauParentesco = mensagem;
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
    if (value.toString().length === 2) tipo = 'naturalidadeUF';
    if (value.toString().length === 7) tipo = 'naturalidade';
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

  const handleChangePage = (val) => {
    switch (val) {
      case 1:
        history.push('/matricula');
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
    if (!matricula.pageIdentificacao) {
      history.push('/matricula');
    }
  }, []);

  useEffect(() => {
    if (matricula.nacionalidade !== undefined) {
      if (matricula.nacionalidade === 'Brasileira') {
        setEstadosOptions(estados.map((estado) => (
          {
            value: estado.id,
            label: `${estado.sigla}`,
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
      }
    )));
  }, [cidades]);

  useEffect(() => {
    if (matricula.responsavel === '') {
      setMatricula({ ...matricula, grauParentesco: '' });
    }
  }, [matricula.responsavel]);

  useEffect(() => {
    setMatricula({ ...matricula, pageOrigem: isValid });
  }, [isValid]);

  useEffect(() => {
    validateIsValid();
  }, [errors]);

  useEffect(() => {
    setErrors(validate(matricula));
  }, [matricula]);

  return (
    <>
      <div className="root">
        <Jumbotron className="jumbotron">
          <h2>Matrícula de Alunos</h2>
        </Jumbotron>
        <div className="divider" />
        <Container>
        <ToggleButtonGroup type="radio" name="options" defaultValue={2} onChange={handleChangePage}>
          <ToggleButton className="btn-warning" value={1}>Identificação</ToggleButton>
          <ToggleButton className="btn-warning" value={2}>Origem</ToggleButton>
          <ToggleButton className="btn-warning" disabled={!isValid} value={3}>Endereço</ToggleButton>
          <ToggleButton className="btn-warning" disabled={!isValid} value={4}>Matrícula</ToggleButton>
          <ToggleButton className="btn-warning" disabled={!isValid} value={5}>Procedência</ToggleButton>
        </ToggleButtonGroup>
        </Container>
        <Wrapper style={{ marginBottom: '40px' }}>
          <Form>
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
                    autoFocus
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
            {errors.naturalidadeUF && <MessageError>{errors.naturalidadeUF}</MessageError>}
            </div>
            )
            { matricula.codigoNaturalidadeUF && (
              <div style={{ width: '100%', margin: '0 5px 0 0' }}>
            <FormSelect
              label="Cidade de Origem:"
              name="naturalidade"
              value={matricula.codigoNaturalidade}
              onChange={handleChangeSelect}
              options={cidadesOptions}
            />
            {errors.naturalidade && <MessageError>{errors.naturalidade}</MessageError>}
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
            {/* { matricula.responsavel && ( */}
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
            </fieldset>
            {errors.grauParentesco && <MessageError>{errors.grauParentesco}</MessageError>}
            {/* )} */}

            <ButtonContainer>
              <Link to="/matricula">
                <Buttons variant="danger">Voltar</Buttons>
              </Link>
              <Link to="/matricula3">
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
