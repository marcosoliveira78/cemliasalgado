const telefoneMask = (value) => {
  const str = value.replace(/\D/g, '')
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/, '($1) $2 ') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    // .replace(/(\d{1})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2');
  // .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  return str;
};
export default telefoneMask;
