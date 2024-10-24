export const filterEmpty = (obj) => {
  let params = {};
  if (obj) {
    for (let key in obj) {
      if (obj[key] !== '' && obj[key] !== undefined) {
        params[key] = obj[key];
      }
    }
  }
  return params;
};

export const random = (min = 0, max) => {
  const val = Math.floor(Math.random() * (max - min));
  return min + val;
};

export const randomChoice = (list) => {
  const index = random(0, list.length);
  return list[index];
};

export const generateCode = (length = 4) => {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += random(0, 9);
  }
  return code;
};
