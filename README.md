# 🔮  Wordle Wizard

***See possible next guesses in [Wordle](https://www.powerlanguage.co.uk/wordle/)***

**I'll be honest, I'm not very good at word games. Scrabble, Bananagrams, and, now, Wordle. They are fun for me! To an extent. Because for some reason my brain just isn't good at coming up with words. I'm also not the quickest reader. I wonder if that's related. Anyway, to help get myself into Wordle, I did something my brain *does* find fun: coding!**

**What if I could make something that would make it easier for me to choose what word to try? I could give it some parameters – What letters do we KNOW are there? Which letters do we know aren't there? Would this be cheating? Who cares! Wordle is now very fun for me. Especially now that I get to take part in the post-game where my family and I tell each other what silly scene is being made in our coloured-emoji-square picture.**

**— Jason, Jan 15 2022**

## What's inside?

### `/browser`
This is the newer version of what's in `/node`. Instead of running a script in the terminal every time you wanted a new set of words, `/browser/index.html` provides a webpage interface for easy Wordle-ing.

### `/node`
My first version of this Wizard was a simple script that I ran in the command line. Not the most user-friendly as you had to (1) know what the heck all this crap is, and (2) it's just kind of tedious to edit a script and run it for each guess.

#### How to use this
You'll need to have [`node`](https://nodejs.org/en/) installed, but once you do, you can run `node ./node/helper.js` in your command line and see what would be valid next guesses in Wordle.

Those next guesses are determined by what's in the first 4 lines:
```javascript
// ./node/helper.js
const knownPositions = ['', '', '', '', ''];
const existsButNotHere =  ['', '', '', '', ''];
const doesntExist = '';
const singlesOnly = true;
```
You'll need to fill in these variables according to the current state of your game and re-run the script file.

- `knownPositions` is an array of strings that should only be one lower case letter each.  
- `existsButNotHere` can handle multiple letters in the same position, but they all still need to be lowercase.
- `doesntExist` is one long string of all the letters that aren't present in the solution. Again, lowercase.
- `singlesOnly` is a boolean value of whether you want words with more the one of the same character in the output.


