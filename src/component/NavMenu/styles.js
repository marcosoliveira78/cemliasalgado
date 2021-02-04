import styled from 'styled-components';
import { FaEdit } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
// import Button from '../Buttons/ButtonLink';

export const LogoEnergisa = styled.img`
  max-width: 120px;
  padding-top: 4px; 
  @media (max-width: 800px){
    max-width: 100px;
    padding-top: 2px;
  }
`;

export const LogoSistema = styled.img`
   max-width: 180px;
   display: flex;
   flex-direction: row;
   align-content: center;
   
  @media (max-width: 600px){
    max-width: 35px;
  }
`;

export const NavTitle = styled.span`
font-family: 'Great Vibes', cursive;
font-size: 35px; 
color: #f5f5f5;
@media (max-width: 600px){
  font-size: 25px; 
  @media (max-width: 465px){
  font-size: 15px; 
  }
  }
`;

export const NavMenuWrapper = styled.nav`
  align-items: center;
  background-color: var(--primary);  
  border-bottom: 1px solid var(--primary);
  color: #f5f5f5;
  display: block;
  flex-direction: row;
  height: auto;
  justify-content: right;
  left: 0;
  padding-left: 11%;
  padding-right: 11%;
  position: fixed;
  top: 48px;
  width: 100%;
  z-index: 1;
  @media (max-width: 600px){
    /* height: 20px; */
    justify-content: right;
  }
  `;

export const ButtonLink = styled(Button)`
  align-content: center;
  align-items: center;
  color: var(--white);
  border: 0px !important;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  padding-top: .5rem;
  padding-left: 1.8rem;
  text-decoration: none;
  transition: opacity .3s;
  padding-bottom: .5rem;
  z-index: 999;
  &:hover,
  &:focus{
    opacity: .8;
    color: #f5f5f5;
    text-decoration: none;
  }
  @media (max-width: 600px){
    height: 20px;
    right : 15px;
    top: 47px;
    justify-content: space-around;

  }
  `;

export const Icone = styled.div`

  
`;

export const faEdit = styled(FaEdit)`
  
`;

export const TextMenu = styled.p`
color: #fff;
font-family: Verdana, Geneva, Tahoma, sans-serif;
font-weight: bold;
`;
