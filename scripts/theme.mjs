import { shiftPressed } from './index.mjs';

/*
 * Code for fetching/toggling the current theme
 */

// Get theme from browser local storage (default to 'auto' if null)
function getTheme() {
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'auto');
  }
  return (localStorage.getItem('theme'));
}

// Change the color scheme of whichever page calls the function and passes in it's own name
export function setTheme(page) {
  let theme = getTheme();

  if (theme === 'light') {
    setLight(page);
  }
  else if (theme === 'dark') {
    setDark(page);
  }
  else if (theme === 'auto') {

    // Check to see if Media-Queries are supported
    if (window.matchMedia) {

      // Check if the dark-mode Media-Query matches
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDark(page);
      } else {
        setLight(page);
      }

      // If Media-Queries are not supported, default to light color scheme
    } else {
      setLight(page);
    }

    // Change the light/dark mode button icon to the auto icon
    document.getElementById('theme-toggle').src = 'assets/vectors/auto_mode_icon.svg';
    document.getElementById('theme-toggle').alt = 'Theme toggle. Current theme is based on your browser preferences.';
  }
  else {
    setLight(page);
  }
}


// Function called when clicking light/dark mode button in navbar, toggles between the 3 modes: light, dark, and auto
export function toggleTheme(page) {
  let currTheme = localStorage.getItem('theme');
  if (currTheme === 'light') {
    localStorage.setItem('theme', 'dark');
  }
  else if (currTheme === 'dark') {
    localStorage.setItem('theme', 'auto');
  }
  else {
    localStorage.setItem('theme', 'light');
  }
  setTheme(page);
}

/*
 * Code for setting light/dark mode settings for a given page
 */

function setLight(page) {

  // Styling specific to the game page
  if (page === 'index') {
    document.getElementById('stylesheet-index-theme').href = 'stylesheets/index/index-light.css';
    document.getElementById('phone-bg').src = 'assets/vectors/phone_light.svg';
    document.getElementById('keyboard-bg').src = 'assets/vectors/keyboard_light.svg';
    document.getElementById('keyboard-backspace-img').src = './assets/vectors/backspace_light.svg';

    if (shiftPressed) {
      document.getElementById('keyboard-shift-img').src = './assets/vectors/shift_light_fill.svg';
    }
    else {
      document.getElementById('keyboard-shift-img').src = './assets/vectors/shift_light.svg';
    }
  }

  // Styling specific to the how to play page
  else if (page === 'explanation') {
    document.getElementById('stylesheet-explanation-theme').href = 'stylesheets/explanation/explanation-light.css';
  }

  // Styling specific to the about page
  else if (page === 'about') {
    document.getElementById('stylesheet-about-theme').href = 'stylesheets/about/about-light.css';
  }

  // Set the css file for elements that all pages share, like the background, header, footer, etc.
  document.getElementById('stylesheet-shared-theme').href = 'stylesheets/shared/page-header-footer-light.css';

  // Change the light/dark mode button icon to the light icon
  document.getElementById('theme-toggle').src = 'assets/vectors/light_mode_icon.svg';
  document.getElementById('theme-toggle').alt = 'Theme toggle. Current theme is light.';
}

function setDark(page) {
  if (page === 'index') {
    document.getElementById('stylesheet-index-theme').href = 'stylesheets/index/index-dark.css';
    document.getElementById('phone-bg').src = 'assets/vectors/phone_dark.svg';
    document.getElementById('keyboard-bg').src = 'assets/vectors/keyboard_dark.svg';
    document.getElementById('keyboard-backspace-img').src = './assets/vectors/backspace_dark.svg';

    if (shiftPressed) {
      document.getElementById('keyboard-shift-img').src = './assets/vectors/shift_dark_fill.svg';
    }
    else {
      document.getElementById('keyboard-shift-img').src = './assets/vectors/shift_dark.svg';
    }
  }
  else if (page === 'explanation') {
    document.getElementById('stylesheet-explanation-theme').href = 'stylesheets/explanation/explanation-dark.css';
  }
  else if (page === 'about') {
    document.getElementById('stylesheet-about-theme').href = 'stylesheets/about/about-dark.css';
  }

  document.getElementById('stylesheet-shared-theme').href = 'stylesheets/shared/page-header-footer-dark.css';

  // Change the light/dark mode button icon to the dark icon
  document.getElementById('theme-toggle').src = 'assets/vectors/dark_mode_icon.svg';
  document.getElementById('theme-toggle').alt = 'Theme toggle. Current theme is dark.';
}


/*
 * Code for fetching/toggling the current font
 */

// Get font from browser local storage (default to 'sans-serif' if null)
function getFont() {
  if (localStorage.getItem('font') === null) {
    localStorage.setItem('font', 'sans-serif');
  }
  return (localStorage.getItem('font'));
}

// Change the font family of the website
export function setFont() {
  let font = getFont();
  let html = document.documentElement;

  if (font === 'sans-serif') {
    html.style.fontFamily = '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif';
    html.style.letterSpacing = '0px';

    document.getElementById('font-toggle').src = 'assets/vectors/text_sans_serif.svg';
    document.getElementById('font-toggle').alt = 'Font toggle. Current font family is sans-serif.';
  }
  else if (font === 'serif') {
    html.style.fontFamily = '\'Times New Roman\', Times, serif';
    html.style.letterSpacing = '0px';

    document.getElementById('font-toggle').src = 'assets/vectors/text_serif.svg';
    document.getElementById('font-toggle').alt = 'Font toggle. Current font family is serif.';
  }
  else if (font === 'dyslexia') {
    html.style.fontFamily = '\'OpenDyslexic\', \'Comic Sans MS\', \'Comic Sans\'';
    html.style.letterSpacing = '-2px';

    document.getElementById('font-toggle').src = 'assets/vectors/text_dyslexia.svg';
    document.getElementById('font-toggle').alt = 'Font toggle. Current font family is dyslexia-friendly.';
  }
  else {
    html.style.fontFamily = '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif';
    html.style.letterSpacing = '0px';

    document.getElementById('font-toggle').src = 'assets/vectors/text_sans_serif.svg';
    document.getElementById('font-toggle').alt = 'Font toggle. Current font family is sans-serif.';
  }
}

// Function called when clicking font button in navbar, toggles between the 3 fonts: sans-serif (default), serif, and dyslexia-friendly
export function toggleFont() {
  let currFont = localStorage.getItem('font');
  if (currFont === 'sans-serif') {
    localStorage.setItem('font', 'serif');
  }
  else if (currFont === 'serif') {
    localStorage.setItem('font', 'dyslexia');
  }
  else {
    localStorage.setItem('font', 'sans-serif');
  }
  setFont();
}