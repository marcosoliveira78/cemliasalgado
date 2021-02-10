const loginMask = (value) => {
  const str = value.replaceAll(' ', '');
  return str;
};
export default loginMask;
