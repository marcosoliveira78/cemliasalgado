/* eslint-disable no-plusplus */
const calculaIdade = (dataAniversario) => {
  const d = new Date();
  const anoAtual = d.getFullYear();
  const mesAtual = d.getMonth() + 1;
  const diaAtual = d.getDate();

  const newDate = dataAniversario.split('/');

  const diaAniversario = parseInt(newDate[0].toString(), 10);
  const mesAniversario = parseInt(newDate[1].toString(), 10);
  const anoAniversario = parseInt(newDate[2].toString(), 10);

  let quantosAnos = anoAtual - anoAniversario;

  if ((mesAtual < mesAniversario || mesAtual === mesAniversario) && diaAtual < diaAniversario) {
    quantosAnos--;
  }
  return quantosAnos < 0 ? 0 : quantosAnos;
};

const calculaIdadeEscolar = (dataAniversario) => {
  const d = new Date();
  const anoAtual = d.getFullYear();
  const mesBase = 3;
  const diaBase = 31;

  const newDate = dataAniversario.split('/');

  const diaAniversario = parseInt(newDate[0].toString(), 10);
  const mesAniversario = parseInt(newDate[1].toString(), 10);
  const anoAniversario = parseInt(newDate[2].toString(), 10);

  let quantosAnos = anoAtual - anoAniversario;

  if (mesBase < mesAniversario || (mesBase === mesAniversario && diaBase < diaAniversario)) {
    quantosAnos--;
  }
  return quantosAnos < 0 ? 0 : quantosAnos;
};

export {
  calculaIdade,
  calculaIdadeEscolar,
};
