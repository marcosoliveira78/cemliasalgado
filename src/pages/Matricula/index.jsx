import React, { useState } from 'react';
import { Form, Jumbotron } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import FormField from '../../component/FormField';
import {
  ButtonContainer, Wrapper, Buttons,
} from '../styles';

const Matricula = () => {
  const [contato, setContato] = useState([]);
  const [matricula] = useState([]);

  const history = useHistory();
  const isValid = true;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContato({ ...contato, [name]: value });
  };

  const handleSubmit = async (form) => {
    form.preventDefault();
    // const response = await itemRep.save([item]);
    // if (response !== null && response.success) {
    history.push('/listagemGeral');
    // }
  };

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
              name="nomeItem"
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
