import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import NavMenu from '../NavMenu';
// import Wallpaper from '../Wallpaper';
// import Watermark from '../Watermark';
// import './styles.css';

const Main = styled.main`
    color: var(--white);
    flex: 1;
    padding-top: 10px;
    padding-left: 5%;
    padding-right: 5%;
    z-index: 10;
`;

function PageDefault(props) {
  const { children } = props;
  return (
        <>
            {/* <Wallpaper />
            <Watermark /> */}
            <NavMenu />
            <Main>
                {children}
            </Main>
            <Footer />
        </>
  );
}

export default PageDefault;