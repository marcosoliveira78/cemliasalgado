import React from 'react';
import { Label } from '../../component/FormSelect/styles';
import { useMatricula } from '../../context/matricula';
import { ContainerMultipleColumns, ContainerAlignLeft } from '../styles';

const confirmacaoMatricula = () => {
  // context
  const { matricula } = useMatricula({});
  console.log('teste:', matricula);
  return (
    <>
        <Label className="fontBolder"> Nome: </Label>
        <Label>{ `${matricula.nome}`}</Label>
    <ContainerMultipleColumns>
    <ContainerAlignLeft>
        <Label className="fontBolder"> Email: </Label>
        <Label>{ `${matricula.email}`}</Label>
    </ContainerAlignLeft>
    <ContainerAlignLeft>
        <Label className="fontBolder"> CPF: </Label>
        <Label>{ `${matricula.cpf}`}</Label>
    </ContainerAlignLeft>
    </ContainerMultipleColumns>
    <ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Telefone Principal: </Label>
        <Label>{ `${matricula.telefonePrincipal}`}</Label>
        </ContainerAlignLeft>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Telefone Secundário: </Label>
        <Label>{ `${matricula.telefoneSecundario}`}</Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
    <ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Data de Nascimento: </Label>
        <Label>{ `${matricula.dataNascimento}`}</Label>
        </ContainerAlignLeft>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Idade Escolar: </Label>
        <Label>{ `${matricula.idadeEscolar}`}</Label>
        </ContainerAlignLeft>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Gênero: </Label>
        <Label>{ `${matricula.genero}`}</Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
    <ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Nacionalidade: </Label>
        <Label>{ `${matricula.nacionalidade}`}</Label>
        </ContainerAlignLeft>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Naturalidade: </Label>
        <Label>{ `${matricula.naturalidade}-${matricula.naturalidadeUF}`}</Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
    <ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Nome do Pai: </Label>
        <Label>{ `${matricula.nomePai}`}</Label>
        </ContainerAlignLeft>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Nome da Mãe: </Label>
        <Label>{ `${matricula.nomeMae}`}</Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
    <ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Responsável: </Label>
        <Label>{ `${matricula.responsavel} (${matricula.grauParentesco})`}</Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
    <ContainerMultipleColumns>
        <ContainerAlignLeft style={{ paddingBottom: 0 }}>
        <Label className="fontBolder"> Endereço: </Label>
        <Label>
        { `${matricula.logradouro}, 
        ${matricula.numero} - 
        ${matricula.complemento} -  
        ${matricula.bairro} -  ${matricula.distrito} `}
        </Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
    <ContainerMultipleColumns>
        <ContainerAlignLeft style={{ paddingTop: 0 }}>
        <Label className="fontBolder fontTransparente"> Endereço: </Label>
        <Label>
        {`${matricula.municipio}/ 
        ${matricula.uf} -  
        ${matricula.cep}`}
        </Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
    <div className="divider" />
    <Label className="fontBolder"> Tipo de Matrícula: </Label>
    <Label>{ `${matricula.tipoMatricula}`}</Label>
    { matricula.ultimaSerieCursada && (
        <>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Última série cursada: </Label>
        <Label>{ `${matricula.ultimaSerieCursada}`}</Label>
        </ContainerAlignLeft>
    <ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Instrumento Cursado: </Label>
        <Label>{ `${matricula.instrumentoCursado1}`}</Label>
        </ContainerAlignLeft>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Instrumento Cursado 2: </Label>
        <Label>{ `${matricula.instrumentoCursado2}`}</Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
        </>
    )}
        <ContainerAlignLeft>
        <Label className="fontBolder"> Série pretendida: </Label>
        <Label>{ `${matricula.seriePretendida}`}</Label>
        </ContainerAlignLeft>
    <ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Instrumento pretendido: </Label>
        <Label>{ `${matricula.instrumentoPretendido1}`}</Label>
        </ContainerAlignLeft>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Instrumento pretendido 2: </Label>
        <Label>{ `${matricula.instrumentoPretendido2}`}</Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
    <ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Turma: </Label>
        <Label>{ `${matricula.turma}`}</Label>
        </ContainerAlignLeft>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Turno: </Label>
        <Label>{ `${matricula.turno}`}</Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
    <div className="divider" />
    <ContainerAlignLeft>
        <Label className="fontBolder"> Procedência: </Label>
        <Label>{ `${matricula.procedencia}`}</Label>
    </ContainerAlignLeft>
    <ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Escolaridade: </Label>
        <Label>{ `${matricula.escolaridade}`}</Label>
        </ContainerAlignLeft>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Situação: </Label>
        <Label>{ `${matricula.escolaridadeStatus}`}</Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Cursará: </Label>
        <Label>{ `${matricula.anoEnsinoRegular}`}</Label>
        </ContainerAlignLeft>
    <ContainerMultipleColumns>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Projetos: </Label>
        <Label>{ `${matricula.projeto}`}</Label>
        </ContainerAlignLeft>
        <ContainerAlignLeft>
        <Label className="fontBolder"> Educação Especial: </Label>
        <Label>{ `${matricula.educacaoEspecial}`}</Label>
        </ContainerAlignLeft>
    </ContainerMultipleColumns>

    </>
  );
};

export default confirmacaoMatricula;
