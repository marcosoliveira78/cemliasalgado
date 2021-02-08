/* eslint-disable */

import { useState } from "react";

// const Auth = () => {

    // const [userLogged, setUserLogged] = useState();
    let USER_LOGGED = '';
    
    // setUserLogged(user_Logged);

    const getUserLogged = () => {
        return JSON.parse(localStorage.getItem('USER_LOGGED'));
    };

    const isAuthenticated = () => {
        return false;
        // return localStorage.getItem('USER_LOGGED') !== null;
    };

    const isLogged = () => {
        return USER_LOGGED;
    };

    const login = (userLogged) => {
        localStorage.setItem('USER_LOGGED', JSON.stringify(userLogged));
        USER_LOGGED = JSON.stringify(userLogged);
    };

    const logout = (tipo) => {
        localStorage.removeItem('USER_LOGGED');
        localStorage.setItem('LOGOUT', tipo)
        USER_LOGGED = null;
    };
    
    const extendSession = (minutos) => {
        const dadosUsuario = JSON.parse(localStorage.USER_LOGGED);
        const horaAtual = Math.floor(+new Date() / 1000);
        const tempoAdicionado = horaAtual + (minutos * 60)
        dadosUsuario.expireSession = tempoAdicionado ;
        localStorage.setItem('USER_LOGGED', JSON.stringify(dadosUsuario));
        USER_LOGGED = JSON.stringify(dadosUsuario);
      };

    // }

export {
    // setUserLogged,
    getUserLogged,
    isAuthenticated,
    isLogged,
    login,
    logout,
    extendSession,
};
