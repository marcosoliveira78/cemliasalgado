/* eslint-disable */

class Auth {
    constructor(props) {
        USER_LOGGED: null;
    }

    setUserLogged(userLogged) {
        this.USER_LOGGED = userLogged;
    }

    getUserLogged() {
        return JSON.parse(localStorage.getItem('USER_LOGGED'));
    }

    isAuthenticated() {
        return localStorage.getItem('USER_LOGGED') !== null;
    }

    isLogged() {
        return this.USER_LOGGED;
    }

    login(userLogged) {
        localStorage.setItem('USER_LOGGED', JSON.stringify(userLogged));
        this.USER_LOGGED = JSON.stringify(userLogged);
    }

    logout(tipo) {
        localStorage.removeItem('USER_LOGGED');
        localStorage.setItem('LOGOUT', tipo)
        this.USER_LOGGED = null;
    }
    
    extendSession(minutos) {
        const dadosUsuario = JSON.parse(localStorage.USER_LOGGED);
        const horaAtual = Math.floor(+new Date() / 1000);
        const tempoAdicionado = horaAtual + (minutos * 60)
        dadosUsuario.expireSession = tempoAdicionado ;
        localStorage.setItem('USER_LOGGED', JSON.stringify(dadosUsuario));
        this.USER_LOGGED = JSON.stringify(dadosUsuario);
      };

}

export default new Auth();
