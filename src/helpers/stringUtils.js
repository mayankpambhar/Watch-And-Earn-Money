export const replaceSpecialAndAlphabet = str =>
  str?.replace(/[^0-9]/g, '') || '';
