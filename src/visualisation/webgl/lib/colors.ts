export const getColorForCondition = (condition: string): string => {
  console.log(condition);

  if (condition === 'Good') return '#3CB371';
  if (condition === 'Fair') return '#FFEB3B';
  if (condition === 'Discard') return '#FF6666';
  return '#000000';
};

export const hexToRgb = (hex: string): [number, number, number] | undefined => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : undefined;
};
