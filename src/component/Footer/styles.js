import styled from 'styled-components';

const FooterBase = styled.footer`
  background-color:  #cf8c34;
  color: var(--white);
  max-height: 7rem;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 2px;
  padding-bottom: 2px;
  text-align: right;
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  @media (max-width: 800px) {
    
    justify-content: center;
  }
`;

export default FooterBase;
