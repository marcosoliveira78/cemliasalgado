/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { FaEdit, FaSistrix } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button, FormControl, InputGroup, Jumbotron, OverlayTrigger, Tooltip as TooltipBs, } from 'react-bootstrap';
import Tables from '../../component/Table';
import { uniqueId } from 'lodash';
import { SearchWrapper, FiltroItem } from '../styles';
// import jsonRep from '../../repositories/json';

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

    const urlBd = 'http://localhost:8080/Matriculas';
    // console.log(urlBd);

    // functions
    function replaceSpecialChars(str)
{

    // const acentos = ["ç", "Ç", "á", "é", "í", "ó", "ú", "ý", "Á", "É", "Í", "Ó", "Ú", "Ý", "à", "è", "ì", "ò", "ù", "À", "È", "Ì", "Ò", "Ù", "ã", "õ", "ñ", "ä", "ë", "ï", "ö", "ü", "ÿ", "Ä", "Ë", "Ï", "Ö", "Ü", "Ã", "Õ", "Ñ", "â", "ê", "î", "ô", "û", "Â", "Ê", "Î", "Ô", "Û" ];
    // const semAcento = ["c", "C", "a", "e", "i", "o", "u", "y", "A", "E", "I", "O", "U", "Y", "a", "e", "i", "o", "u", "A", "E", "I", "O", "U", "a", "o", "n", "a", "e", "i", "o", "u", "y", "A", "E", "I", "O", "U", "A", "O", "N", "a", "e", "i", "o", "u", "A", "E", "I", "O", "U" ];
    
    // str.map((x) => {

    // })
    
    // str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
    // str = str.replace(/[àáâãäå]/,"a");
    // str = str.replace(/[ÈÉÊË]/,"E");
    // str = str.replace(/[ìíîï]/,"i");
    // str = str.replace(/[Ç]/,"C");
    // str = str.replace(/[ç]/,"c");

    // o resto

    return str.normalize("NFD").replace(/[^a-zA-Zs]/g, ""); 

    // public static string RemoveAcentos(string str)
    // {
    //     /** Troca os caracteres acentuados por não acentuados **/
        

    //     for (int i = 0; i < acentos.Length; i++)
    //     {
    //         str = str.Replace(acentos[i], semAcento[i]);
    //     }
    //     /** Troca os caracteres especiais da string por "" **/
    //     string[] caracteresEspeciais = { "¹", "²", "³", "£", "¢", "¬", "º", "¨", "\"", "'", ".", ",", "-", ":", "(", ")", "ª", "|", "\\\\", "°", "_", "@", "#", "!", "$", "%", "&", "*", ";", "/", "<", ">", "?", "[", "]", "{", "}", "=", "+", "§", "´", "`", "^", "~" };

    //     for (int i = 0; i < caracteresEspeciais.Length; i++)
    //     {
    //         str = str.Replace(caracteresEspeciais[i], "");
    //     }

    //     /** Troca os caracteres especiais da string por " " **/
    //     str = Regex.Replace(str, @"[^\w\.@-]", " ",
    //                         RegexOptions.None, TimeSpan.FromSeconds(1.5));

    //     return str.Trim();
    // }


}

    // Hooks
    const [matriculas, setMatriculas] = useState([]);
    const [resultado, setResultado] = useState([]);
    const [filtro, setFiltro] = useState([]);

    let rows

    async function getMatriculaByFiltro() {
        if (filtro !== null && filtro !== undefined) {
            if (filtro.length >= 3) {
                const filtrado = matriculas.filter((matricula) => 

                    (replaceSpecialChars(matricula.nome).toLowerCase().includes(replaceSpecialChars(filtro).toLowerCase()))
                );
                setResultado([...filtrado])
            }
            if (filtro.length === 0) {
                setResultado([...matriculas])
            }
        }
    }

    // Handles
    const handleChange = (event) => {
        const { value } = event.target;
        setTimeout(() => {
            setFiltro(value);
        }, 200);
    };



    // Table Rows
    //useEffect(() => {
    rows = resultado.map((matricula) => (
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
    //}, [resultado])
    // Triggers
    useLayoutEffect(() => {
        fetch(urlBd)
            .then(async (resp) => {
                const resultado = await resp.json();
                // console.log('Resultado: ', resultado)
                setMatriculas([...resultado,]);
                setResultado([...resultado,]);
            })
    }, []);

    useEffect(() => {
        getMatriculaByFiltro();
    }, [filtro]);
    // console.log('Resultado: ', resultado);
    return (
        <>
            <div className="root">
                
                <SearchWrapper style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '100%'
                }}>
                    {/* <Link to="/Item/Cadastrar">
                        <Button variant="warning" className="btn btn-info">Cadastrar Aluno</Button>
                    </Link> */}
                    <Jumbotron className="jumbotron">
                    <h1>Listagem de Alunos</h1>
                    <span>
                        Listagem dos alunos que preencheram o formulário de matrícula em 2021.
                    </span>
                </Jumbotron>
                    <OverlayTrigger placement="left" overlay={<TooltipBs id={uniqueId()}>Filtrar por Nome</TooltipBs>}>
                        <FiltroItem style={{ padding: '0', height: 'auto' }}>
                            <InputGroup size="lg">
                                <FormControl className="searchInputItens" onChange={handleChange} />
                                <InputGroup.Append>
                                    <InputGroup.Text
                                        style={{
                                            backgroundColor: '#cce3d9',
                                            borderLeftColor: '#cce3d9',
                                        }}>
                                        <FaSistrix style={{ fontSize: '18px' }} />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </FiltroItem>
                    </OverlayTrigger>
                </SearchWrapper>
                <div className="divider" />
                <Tables headCells={headCells} rows={rows} collapsable={false} />
            </div>
        </>
    );
}

export default ListagemGeral;
