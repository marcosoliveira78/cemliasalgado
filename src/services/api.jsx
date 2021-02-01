import axios from 'axios';
import { uniqueId } from 'lodash';
import ShowMessage from './toast';

const api = axios.create({
  baseURL: window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/'
    : 'https://cemliasalgado.herokuapp.com/',
  // baseURL: 'https://localhost:8080/Matriculas',
  // baseURL: 'https://awcseapi_ds.energisa.corp/',
  // baseURL: base,
  timeout: 90000,
  'Access-Control-Allow-Origin': '*',
});

api.interceptors.request.use(async (config) => {
  const rConfig = config;
  rConfig.headers.CacheControl = 'no-cache';

  return rConfig;
});

const request = async (method, url, param) => {
  try {
    const response = await api[method](url, param);
    if (response.status === 200) {
      if (method !== 'get') {
        ShowMessage('success', response.data.mensagem);
      }
      // console.log(response.data);
      return response.data;
    }
    ShowMessage('error', 'Ocorreu um erro.');
  } catch (error) {
    let errors = '';
    if (error.response !== undefined) {
      if (error.response.data.msgError === 'ORA-12537: Network Session: End of file') {
        errors = 'Conexão com o banco de dados encerrada inesperadamente.';
      } else if (error.response.data.msgError === 'ORA-12520: TNS:listener could not find available handler for requested type of server') {
        errors = 'Conexão com banco de dados não encontrada.';
      } else {
        errors = error.response.data.msgError
          ? error.response.data.msgError : error.response.data.title;
      }
    } else {
      errors = 'Falha na comunicação com o servidor.';
    }
    if (errors) {
      ShowMessage('error', errors, 5000, uniqueId);
    }
  }
  return null;
};

export default request;
