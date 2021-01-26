import React, { useLayoutEffect, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button, Jumbotron } from 'react-bootstrap';
import Tables from '../../component/Table';

// Table Headers
const headCells = [
    {
        id: 'nome', numeric: false, disablePadding: true, label: 'Nome',
    },
    {
        id: 'telefonePrincipal', numeric: false, disablePadding: false, label: 'Telefone',
    },
    {
        id: 'educacaoMusical', numeric: true, disablePadding: false, label: 'Educação Musical',
    },
    {
        id: 'educacaoTecnica', numeric: true, disablePadding: false, label: 'Educação Técnica',
    },
    {
        id: 'instrumento', numeric: true, disablePadding: false, label: 'Instrumento',
    },
    {
        id: 'instrumento2', numeric: true, disablePadding: false, label: 'Instrumento 2',
    },
    {
        id: 'status', numeric: true, disablePadding: false, label: 'Status',
    },
    {
        id: 'acoes', numeric: true, disablePadding: false, label: 'Ações',
    },
];


function ListagemGeral() {

    const [matriculas, setMatriculas] = useState([]);
    const urlBd = 'http://localhost:8080/Matriculas';
    console.log(urlBd);



    // Hooks
    // Table Rows
    const rows = matriculas.map((matricula) => (
        {
            key: matricula.id,
            dataHora: matricula.dataHora,
            nome: matricula.nome,
            cpf: matricula.cpf,
            dataNascimento: matricula.dataNascimento,
            genero: matricula.genero,
            nacionalidade: matricula.nacionalidade,
            naturalidade: matricula.naturalidade,
            naturalidadeUf: matricula.naturalidadeUf,
            nomePai: matricula.nomePai,
            nomeMae: matricula.nomeMae,
            responsavel: matricula.responsavel,
            grauParentesco: matricula.grauParentesco,
            telefonePrincipal: matricula.telefonePrincipal,
            telefoneSecundario: matricula.telefoneSecundario,
            email: matricula.email,
            logradouro: matricula.logradouro,
            numero: matricula.numero,
            bairro: matricula.bairro,
            distrito: matricula.distrito,
            municipio: matricula.municipio,
            uf: matricula.uf,
            cep: matricula.cep,
            tipoMatricula: matricula.tipoMatricula,
            ultimaSerieCursada: matricula.ultimaSerieCursada,
            instrumentoCursado1: matricula.instrumentoCursado1,
            instrumentoCursado2: matricula.instrumentoCursado2,
            educacaoMusical: matricula.educacaoMusical,
            educacaoTecnica: matricula.educacaoTecnica,
            instrumento: matricula.instrumento,
            turma: matricula.turma,
            turno: matricula.turno,
            procedencia: matricula.procedencia,
            escolaridade: matricula.escolaridade,
            projeto: matricula.projeto,
            educacaoEspecial: matricula.educacaoEspecial,
            confirmacaoDesejoMatricula: matricula.confirmacaoDesejoMatricula,
            instrumento2: matricula.instrumento2,
            AnoaSerCursado: matricula.AnoaSerCursado,
            status: 'A',
            acoes:
                <>
                    <Tooltip title="Editar">
                        <Link to={{ pathname: `/Matricula/Editar/${matricula.id}` }}>
                            <FaEdit className="icone" />
                        </Link>
                    </Tooltip>
                </>,
        }
    ));


    // Triggers
    useLayoutEffect(() => {
        fetch(urlBd)
            .then(async (resp) => {
                const resultado = await resp.json();
                console.log('Resultado: ', resultado)
                setMatriculas([...resultado,]);
            })
    }, []);

    //   return (
    //     <Wrapper>
    //       {matriculas && (
    //         matriculas.map((matricula) => (
    //             <div style={{display: 'flex', color: '#f5f5f5'}}> {`${matricula.id} - ${matricula.nome} - ${matricula.naturalidade}`}</div>
    //         ))
    //       )}
    //     </Wrapper>
    //   );
    return (
        <>
            <div className="root">
                <Jumbotron className="jumbotron">
                    <h1>Listagem de Alunos</h1>
                    <p>
                        Listagem dos alunos que preencheram o formulário de matrícula em 2021.
          </p>
                    <p>
                        <Link to="/Grupo/Cadastrar">
                            <Button variant="info" className="btn btn-info">Cadastrar Aluno</Button>
                        </Link>
                    </p>
                </Jumbotron>
                <div className="divider" />
                <Tables headCells={headCells} rows={rows} collapsable={false} />
            </div>
        </>
    );
}

export default ListagemGeral;
