import React from 'react';
import FooterBase from './styles';
import Logo from '../../assets/image/logo(white).png';

function Footer() {
  return (
    <FooterBase>
      <a href="/">
        <img src={Logo} alt="Logo CEM" style={{ height: '20px' }} />
      </a>

    </FooterBase>
  );
}

export default Footer;
