import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const Body = styled.div`
    margin-top: 2vh;
    min-height: 2vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: flex-start;
    font-size: calc(2px + 2vmin);
    color: var(--titulo);
    font-weight: 700;
    padding-bottom: 2vh;
    width: 100%;
`;

export const CadastroBody = styled.div`
  display: inline-block;
  flex-direction: column;
  align-items: center;
  align-content: flex-end;
  justify-content: flex-end;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100%;
`;

export const BorderLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #5d5d5d5d;
  border: 2px solid #5d5d5d5d;
  border-radius: 5px;
  padding: 3px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 1vh;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Buttons = styled(Button)`
  margin-top: 5px;
  margin-right: 2vh;
  padding: 5px 15px;
  min-width: 100px;
`;

export const ButtonChamado = styled(Button)`
  padding: 5px 40px;
  margin-top: 5px;
  /* margin-right: 5px; */
  display: inline-block;
`;

export const ButtonX = styled(Button)`
  background-color : #00abcc;
  display: flex;
  color: #fff;
  margin-bottom: 1vh;
  & :hover { background-color: #007a92 };
`;

export const CadastroButtons = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const CadastroButtonUp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  align-content: flex-end;
  justify-content: flex-end;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 15%;
  background-color:'orange';
`;

export const CadastroContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const CadastroHeader = styled.div`
  margin-top: 2vh;
  min-height: 5vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: var(--titulo);
  width: 85%;
  padding-bottom: 5vh;
  background-color:'blue';
`;

export const CadastroWrapper = styled.div`
  margin-bottom: 2vh;
  margin-top: 10vh;
  background-color: #efefef;
  border-radius: 5px;
  padding: 10px;
  z-index: 9999;
`;

export const ConsultaHeader = styled.div`
    margin-top: 7rem;
    margin-bottom: 2vh;
    background-color: #ffffff50 ;
    min-height: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: var(--white);
  
`;

export const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    justify-content: flex-start;
    padding-left: 10px;
  }
`;

export const ContainerAlignLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 5px 0;
`;

export const ContainerMultipleColumns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const ContainerCentered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`;

export const FiltroItem = styled.div`
    color: #f5f5f5df;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    align-content: center;  
    padding-top: 3vh;
    font-size: 30px;  
    text-decoration: none;
    z-index: 10;
    &:hover,
    &:focus,
    &:active{
      color: #f5f5f5;
      text-decoration: none;
  }
  @media (max-width: 465px){
    
  }
    `;

export const FlexColumnLeft = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 0 5px 0 0;
  @media (max-width: 1200px){
    margin: 0;
  }
`;

export const FlexColumnRight = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 0 0 0 5px;
  @media (max-width: 1200px){
    margin: 0;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 10px;
  text-align: left;
  @media (max-width: 1200px){
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: stretch;
    max-width: 100%;
    text-align: left;
  }
`;

export const Header = styled.div`
  margin-top: 2vh;
  min-height: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size:  30px;
  color: var(--titulo);
  font-weight: bold;
  padding-bottom: 2vh;
  width: 100%;
  border-bottom: 1px solid #5d5d5d5d;
`;

export const MessageError = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
font-size: 12px;
color: #ff0000;
margin-bottom: -17px !important;
margin: 0;
padding: 3px 0 0 2px;
`;

export const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
`;

export const Wrapper = styled.div`
margin-bottom: 50px;
background-color: #f5f5f5;
border-radius: 5px;
padding: 10px;
width: 100%;
`;

export const Outdoor = styled.div`
display: flex;
align-items: center;
justify-content: center;
font-size: 40px;
`;
