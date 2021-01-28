import React from 'react';
import FooterBase from './styles';
import Logo from '../../assets/image/logo.png';

function Footer() {
  return (
    <FooterBase>
      <a href="/">
        <img src={Logo} alt="Logo Energisa" style={{ height: '20px' }} />
      </a>

    </FooterBase>
  );
}

export default Footer;
