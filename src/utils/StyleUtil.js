export const concatClass = (list) => {
  const a = list.reduce((item) => {
    return `${item} `;
  });
  return a;
};

export const getRandomColours = () => {
  const letters = '0123456789ABCDEF'.split('');
  let colour = '#';
  const addDigitToColour = (limit) => {
    colour += letters[Math.round(Math.random() * limit)]
  };
  for (let i = 0; i < 6; i += 1) {
    addDigitToColour(15);
  }
  return colour;
};
