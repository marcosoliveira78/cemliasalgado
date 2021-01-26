import Select from 'react-select';
import styled from 'styled-components';

export const MODAL = styled.div`
  margin-bottom: 2vh;
  margin-top: 8vh;
  background-color: #5d5d5d5d;
  border: 1px solid #5d5d5d5d;
  border-radius: 5px;
  padding: .1%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 17%;
  height: 70vh;
  left: 6%;
  right: 6%;
  z-index: 9999;
`;

export const MODALContainer = styled.div`
background-color: #efefefef;
color: #000;
width: 99%;
height: 99%;
border-radius: 5px;
border: 1px solid #5d5d5d;
`;

export const FormGroup = styled.div`
align-items: flex-start;
background-color: #f5f5f5;
border: 1px solid #5d5d5d5d;
border-bottom: 4px solid #a9afb58a;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: flex-start;
margin: 20px 2px 0 2px;
padding: 5px 25px 0 0;
width: 100%;

&:hover {
  border-bottom: 4px solid var(--primary) !important;
}
`;

export const Label = styled.label`
color: #5d5d5d;
padding: 2px 1vh 0 1vh;
`;
Label.Text = styled.span`
  color: #5d5d5d;
  padding-bottom: 5px;
  margin-left: 10px;
  margin-top: 2px;
  transform-origin: 0% 0%;
  font-size: 11px;
`;

export const Selecty = styled(Select)`
  background: #f5f5f5;
  color: #5d5d5d;
  display: block;
  width: 100%;
  font-size: 18px;
  text-align:center;
  border-radius: 4px;
  
  margin: 10px;
  margin-top: 0 !important;
  margin-right: 10px !important;
  transition: border-color .3s;

`;
