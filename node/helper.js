const knownPositions = ['', '', '', '', ''];
const existsButNotHere =  ['a', '', 'a', 'n', 'a'];
const doesntExist = 'risemochbld';
const singlesOnly = true;

(async () => {
  console.log(await match(
    knownPositions, 
    existsButNotHere,
    doesntExist,
    singlesOnly // Filter words with two of the same character
  ))
})();

async function match(knownPosition, unknownPosition, doesntExist, singlesOnly=true) {
  const { FILTERED_WORDS } = await import('../shared/words.mjs');

  let kp = knownPosition
  let up = unknownPosition
  let de = doesntExist.split('')

  return FILTERED_WORDS.filter(word => {
    // Remove words with letters that should be exact match
    if (kp[0] && kp[0] !== word[0]) return false;
    if (kp[1] && kp[1] !== word[1]) return false;
    if (kp[2] && kp[2] !== word[2]) return false;
    if (kp[3] && kp[3] !== word[3]) return false;
    if (kp[4] && kp[4] !== word[4]) return false;

    // Remove words with letters that don't exist
    if (de.length) {
      for (let char of de) {
        if (word.includes(char)) return false;
      }
    }

    // Need to check for known letters with unknown positions
    // But return false if we know they're NOT in position `p`
    for (let p in up) {
      p = Number(p);
      if (up[p]) {
        for (let char of up[p]) {
          if (!word.includes(char)) return false;
          if (word[p] === char) return false;
        }
      }
    }

    if (singlesOnly) return isSinglesOnly(word);
    return true;
  })
}

function isSinglesOnly(word) {
  const chars = new Set();
  for (let c of word) {
    if (chars.has(c)) return false;
    else chars.add(c);
  }
  return true;
}