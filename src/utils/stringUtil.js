const accentMap = {
  'á':'a', 'Å':'A', 'é':'e', 'í':'i','ó':'o','ú':'u'
};

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const accentFold = (s) => {
  if (!s) {
    return '';
  }
  let ret = '';
  for (let i = 0; i < s.length; i+=1) {
    ret += accentMap[s.charAt(i)] || s.charAt(i);
  }
  return ret;
};

export const accentFoldedHilite = (str, q) => {
  const strFolded = accentFold(str).toLowerCase().replace(/[<>]+/g, '');
  const qFolded = accentFold(q).toLowerCase().replace(/[<>]+/g, '');  // Create an intermediate string with hilite hints
  // Example: fulani<lo> <lo>pez
  const re = new RegExp(qFolded, 'g');
  const hiliteHints = strFolded.replace(re, `<${qFolded}>`);  // Index pointer for the original string
  let spos = 0;
  // Accumulator for our final string
  let highlighted = '';  // Walk down the original string and the hilite hint
  // string in parallel. When you encounter a < or > hint,
  // append the opening / closing tag in our final string.
  // If the current char is not a hint, append the equiv.
  // char from the original string to our final string and
  // advance the original string's pointer.
  for (let i = 0; i< hiliteHints.length; i+=1) {
    const c = str.charAt(spos);
    const h = hiliteHints.charAt(i);
    if (h === '<') {
      highlighted += '<b>';
    } else if (h === '>') {
      highlighted += '</b>';
    } else {
      spos += 1;
      highlighted += c;
    }
  }
  return highlighted;
};

export default {
  validateEmail,
  accentFold,
  accentFoldedHilite,
};
