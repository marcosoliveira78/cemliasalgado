import styled, { css } from 'styled-components';

export const FormFieldWrapper = styled.div`
  position: relative; 
  margin-top: 20px;
  textarea {
    min-height: 150px;
  }
  input[type="number"] {
    padding-left: 56px;
    width: 250px;
    display: flex;
    flex-direction: row;
  }
  label{
    width: 100%;
  }
  `;

export const Label = styled.label`
margin-bottom: 0 !important;

`;
Label.Text = styled.span`
  color: #5d5d5d;
  height: 57px;
  position: absolute; 
  top: 0;
  left: 16px;
  
  
  display: flex;
  align-items: center;
  
  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  transition: .1s ease-in-out;
  `;

export const Input = styled.input`
  background: #f5f5f5;
  color: #5d5d5d;
  display: block;
  width: 100%;
  height: 57px;
  font-size: 18px;
  text-align:left;
  outline: 0;
  border: 0;
  border-left: 1px solid #5d5d5d5d;
  border-right: 1px solid #5d5d5d5d;
  border-top: 1px solid #5d5d5d5d;
  border-bottom: 4px solid #a9afb58a;
  
  padding: 16px 16px;
  margin-bottom: 0 !important;
  
  resize: none;
  border-radius: 4px;
  transition: border-color .3s;
  
  &:focus {
    border-bottom-color: var(--primary);
  }
  &:focus + span {
    transform: scale(.6) translateY(-10px);
  }
  ${({ hasValue }) => hasValue && css`
    & + span {
      transform: scale(.6) translateY(-10px);
    }
  `}
`;
