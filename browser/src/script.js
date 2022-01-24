/**
 * DOM elements
 */

const known2Input = document.getElementById("known2")
const known3Input = document.getElementById("known3")
const known1Input = document.getElementById("known1")
const known4Input = document.getElementById("known4")
const known5Input = document.getElementById("known5")

const exists1Input = document.getElementById("exists1")
const exists2Input = document.getElementById("exists2")
const exists3Input = document.getElementById("exists3")
const exists4Input = document.getElementById("exists4")
const exists5Input = document.getElementById("exists5")

const doesntExistInput = document.getElementById("doesntExistTextInput")

const singlesOnlyInput = document.getElementById("singlesOnlyCheckbox")
const excludePrevAnswersInput = document.getElementById("excludePrevAnswersCheckbox")
const shuffleOutputCheckbox = document.getElementById("shuffleOutputCheckbox")
const alphabetizeOutputCheckbox = document.getElementById("alphabetizeOutputCheckbox")

const possibleWordsCountEl = document.getElementById("possibleWordsCount")
const possibleWordsEl = document.getElementById("possibleWords")

/**
 * Add event listeners
 */

known1Input.addEventListener('input', runMatch)
known2Input.addEventListener('input', runMatch)
known3Input.addEventListener('input', runMatch)
known4Input.addEventListener('input', runMatch)
known5Input.addEventListener('input', runMatch)

exists1Input.addEventListener('input', runMatch)
exists2Input.addEventListener('input', runMatch)
exists3Input.addEventListener('input', runMatch)
exists4Input.addEventListener('input', runMatch)
exists5Input.addEventListener('input', runMatch)

doesntExistInput.addEventListener('input', runMatch)

singlesOnlyInput.addEventListener('input', runMatch)
excludePrevAnswersInput.addEventListener('input', runMatch)
shuffleOutputCheckbox.addEventListener('input', runMatch)
alphabetizeOutputCheckbox.addEventListener('input', runMatch)

/**
 * Function Defs
 */

import { ALL_WORDS, USED_WORDS } from '../../shared/words.mjs';
const FILTERED_WORDS = ALL_WORDS.filter(word => !USED_WORDS.has(word))

function runMatch() {
  // Get all necessary values
  const knownPositions = [
    known1Input.value, 
    known2Input.value, 
    known3Input.value, 
    known4Input.value, 
    known5Input.value
  ];
  const existsButNotHere = [
    exists1Input.value, 
    exists2Input.value, 
    exists3Input.value, 
    exists4Input.value, 
    exists5Input.value
  ];
  const doesntExist = doesntExistInput.value;
  const singlesOnly = singlesOnlyInput.checked;
  const excludePrevAnswers = excludePrevAnswersInput.checked;
  const shuffleOutput = shuffleOutputCheckbox.checked;
  const alphabetize = alphabetizeOutputCheckbox.checked;

  // Determine valid words
  const filteredWords = match(
    knownPositions, 
    existsButNotHere,
    doesntExist,
    // Choose which set of words to filter from
    excludePrevAnswers ? FILTERED_WORDS : ALL_WORDS, 
    singlesOnly
  )

  if (alphabetize) {
    filteredWords.sort();
  } else if (shuffleOutput) {
    shuffle(filteredWords)
  }

  // Set results into DOM
  possibleWordsCountEl.innerText = filteredWords.length.toLocaleString() + ' possible words'
  possibleWordsEl.innerText = filteredWords.join(', ')
}

/**
 * 
 * @param {string[]} knownPosition 
 * @param {string[]} unknownPosition 
 * @param {string} doesntExist 
 * @param {string[]} words 
 * @param {boolean} singlesOnly 
 * @returns {string[]}
 */
function match(
  knownPosition, 
  unknownPosition, 
  doesntExist, 
  words, 
  singlesOnly=false
) {
  const sanitizeString = (str) => str.trim().toLowerCase()
  let kp = knownPosition.map(str => sanitizeString(str)[0]) // Only take first char
  let up = unknownPosition.map(sanitizeString)
  let de = sanitizeString(doesntExist).split('')

  return words.filter(word => {
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

/**
 * Tests if a word has only 
 * unique characters.
 * @param {string} word
 */
function isSinglesOnly(word) {
  const chars = new Set();
  for (let c of word) {
    if (chars.has(c)) return false;
    else chars.add(c);
  }
  return true;
}

/**
 * Shuffles in place via Fisher Yates.
 * Returns `undefined` to make this clear.
 * @param {[]} arr
 */
 function shuffle(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    const j = Math.floor(Math.random() * i);
    let x  = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
    i--;
  }
}