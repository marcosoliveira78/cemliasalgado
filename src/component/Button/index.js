import styled from 'styled-components';

const Button = styled.button` 
  color: var(--grayLight);
  border: 0px solid var(--white);
  box-sizing: border-box;
  cursor: pointer;
  padding: 16px 24px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  background-color: var(--primary);
  margin-left: 25px;
  margin-top: 25px;
  transition: opacity .3s;
  &:hover
   {
    opacity: .7;
  }
`;

export default Button;
