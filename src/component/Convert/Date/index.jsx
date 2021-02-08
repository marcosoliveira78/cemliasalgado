const convertDate = (data) => {
  const date = new Date(data);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hour = (`0${(date.getHours() % 60)}`).slice(-2);
  const minutes = (`0${(date.getMinutes() % 60)}`).slice(-2);
  const seconds = (`0${(date.getSeconds() % 60)}`).slice(-2);

  return (`${day}/${month}/${year} ${hour}:${minutes}:${seconds}`);
};

export default convertDate;
