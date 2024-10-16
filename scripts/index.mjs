import { setTheme, toggleTheme, setFont, toggleFont } from './theme.mjs';

// Init variable for selected gamemode (0 = intro)
let gamemode = 0;

// Init variables for keyboard state and shift key state
export let shiftPressed = false;

// Init variables related to typing custom words
let customWords = 5;
let currentCustomWord = '';

// Init variable for storing last entered word, used to influence subsequent autocomplete suggestions
let mostRecentWord = {word: '', type: ''};

let suggestions = [{word: 'Welcome', type: 'custom'}, {word: 'To', type: 'custom'}, {word: 'AutoStory', type: 'custom'}];

document.addEventListener("DOMContentLoaded", function(event) {
  setTheme('index');
  setFont();

  gamemode = 2;
  setKeyboardState('customsAvailable');
  
  // Set event listener to dynamically detect changes in light/dark mode
  if(window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change',({ matches }) => {
        setTheme('index')
      })
  }

  // Functionaliy for light/dark button toggle
  window.toggleTheme = toggleTheme;

  // Functionality for font button toggle
  window.toggleFont = toggleFont;
});

// Function called by shift key, toggles capital letters when entering a custom word
window.toggleShift = function toggleShift() {
  if (!shiftPressed) {
    shiftPressed = true;
  }
  else {
    shiftPressed = false;
  }
  setTheme('index');
}

window.useCustomWord = function useCustomWord() {
  customWords = customWords - 1;

  setKeyboardState('currentlyTyping');
  setAutocompleteState('off');
}

window.typeCharacter = function typeCharacter(character) {
  let answerField = document.getElementById('game-answer-text');

  if (character === 'enter') {
    if (currentCustomWord.substring(currentCustomWord.length - 1, currentCustomWord.length) !== ' '){
      answerField.textContent = answerField.textContent + ' ';
    }

    if (shiftPressed) {
      toggleShift();
    }

    mostRecentWord.word = currentCustomWord;
    mostRecentWord.type = 'custom';

    currentCustomWord = '';

    if (gamemode == 2){
      if (customWords > 0) {
        setKeyboardState('customsAvailable');
      } else {
        setKeyboardState('noCustomsLeft');
      }
    } else {
      setKeyboardState('freeTyping');
    }

    setAutocompleteState('on');
  }
  else if (character === 'space') {
    currentCustomWord = currentCustomWord + ' ';
    answerField.textContent = answerField.textContent + ' ';

    setAutocompleteState('off');
  }
  else if (character === 'backspace') {
    if (currentCustomWord.length > 0){
      currentCustomWord = currentCustomWord.substring(0, currentCustomWord.length - 1);
      answerField.textContent = answerField.textContent.substring(0, answerField.textContent.length - 1);
    }

    setAutocompleteState('off');
  }
  else {
    if (shiftPressed) {
      currentCustomWord = currentCustomWord + character.toUpperCase();
      answerField.textContent = answerField.textContent + character.toUpperCase();
    } else {
      currentCustomWord = currentCustomWord + character;
      answerField.textContent = answerField.textContent + character;
    }

    setAutocompleteState('off');
  }
}

window.selectSuggestion = function selectSuggestion(option) {
  let answerField = document.getElementById('game-answer-text');
  let selectedWord = suggestions[option];

  answerField.textContent = answerField.textContent + selectedWord.word + ' ';
  mostRecentWord.word = selectedWord.word;
  mostRecentWord.type = selectedWord.type;
}

function setKeyboardState(state) {
  let keyboard = document.getElementsByClassName('keyboard-key');
  let customKey = document.getElementById('keyboard-custom');

  if (state === 'off') {
    for (let key of keyboard) {
      key.style.opacity = '0.0';
      key.disabled = true;
    }
  }
  else if (state === 'customsAvailable') {
    for (let key of keyboard) {
      key.style.opacity = '0.5';
      key.disabled = true;
    }

    if (customWords > 0) {
      customKey.style.opacity = '1.0';
      customKey.disabled = false;
    }
    else {
      customKey.style.opacity = '0.5';
      customKey.disabled = true;
    }
  }
  else if (state === 'currentlyTyping') {
    for (let key of keyboard) {
      key.style.opacity = '1.0';
      key.disabled = false;
    }

    customKey.style.opacity = '0.5';
    customKey.disabled = true;
    customKey.textContent = 'free: ' + customWords;
  }
  else if (state === 'noCustomsLeft') {
    for (let key of keyboard) {
      key.style.opacity = '0.5';
      key.disabled = true;
    }

    customKey.style.opacity = '0.5';
    customKey.disabled = true;
    customKey.textContent = 'free: ' + customWords;
  }
  else if (state === 'freeTyping') {
    for (let key of keyboard) {
      key.style.opacity = '1.0';
      key.disabled = false;
    }

    customKey.style.opacity = '0.0';
    customKey.disabled = true;
    customKey.textContent = '';
  }
}

function setAutocompleteState(state) {
  let suggestions = document.getElementsByClassName('game-keyboard-autocomplete');

  if (state === 'off') {
    for (let suggestion of suggestions) {
      suggestion.style.opacity = '0.0'
      suggestion.disabled = true;
    }
  }
  else {
    for (let suggestion of suggestions) {
      suggestion.style.opacity = '1.0'
      suggestion.disabled = false;
    }
  }
}

async function getData() {
  const url = "https://api.api-ninjas.com/v1/randomword?type=adjective";
  try {
    const resp = await fetch(
      url,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "super secret key"
        }
      }
    );
    if (!resp.ok) {
      throw new Error('Response status $(response.status)');
    }

    const json = await resp.json();
    console.log(json);

  } catch (error) {
    console.error(error.message);
  }
}