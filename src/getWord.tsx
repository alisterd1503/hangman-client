import words from "./wordList.json"
const options = ['easy','medium','hard']

// Function that returns a random word from the words list
export function getWord(difficulty: string) {
    let word;
    do {
      word = words[Math.floor(Math.random() * words.length)];
      if (difficulty === 'easy' && word.length === 4) return word;
      else if (difficulty === 'medium' && (word.length === 5 || word.length === 6)) return word;
      else if (difficulty === 'hard' && word.length > 6) return word;
      else if (!options.includes(difficulty)) return word;
    } while (true);
  }