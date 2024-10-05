document.addEventListener("DOMContentLoaded", function(event) {
  getTheme();
  
  // Set event listener to dynamically detect changes in light/dark mode
  if(window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change',({ matches }) => {
        getTheme()
      })
  }
});

function getTheme() {
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'auto');
  }
  let theme = localStorage.getItem('theme');

  if (theme === 'light') {
    setLight();
  }
  else if (theme === 'dark') {
    setDark();
  }
  else if (theme === 'auto') {

    // Check to see if Media-Queries are supported
    if (window.matchMedia) {

      // Check if the dark-mode Media-Query matches
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        setDark();
      } else {
        setLight();
      }
    } else {
      setLight();
    }
    document.getElementById('theme-toggle').src = 'assets/vectors/auto_mode_icon.svg';
    document.getElementById('theme-toggle').alt = 'Theme toggle. Current theme is based on your browser preferences.';
  }
}

function toggleTheme() {
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
  getTheme();
}

function setLight() {
  document.getElementById('stylesheet-index-theme').href = 'stylesheets/index/index-light.css';
  document.body.style.backgroundColor = 'rgb(230, 230, 230)';

  document.getElementById('theme-toggle').src = 'assets/vectors/light_mode_icon.svg';
  document.getElementById('theme-toggle').alt = 'Theme toggle. Current theme is light.';

  document.getElementById('phone-bg').src = 'assets/vectors/phone_light.svg';
  document.getElementById('keyboard-bg').src = 'assets/vectors/keyboard_light.svg';
  document.getElementById('keyboard-shift-img').src = './assets/vectors/shift_light.svg';
  document.getElementById('keyboard-backspace-img').src = './assets/vectors/backspace_light.svg';
}

function setDark() {
  document.getElementById('stylesheet-index-theme').href = 'stylesheets/index/index-dark.css';
  document.body.style.backgroundColor = 'rgb(45, 45, 45)';

  document.getElementById('theme-toggle').src = 'assets/vectors/dark_mode_icon.svg';
  document.getElementById('theme-toggle').alt = 'Theme toggle. Current theme is dark.';

  document.getElementById('phone-bg').src = 'assets/vectors/phone_dark.svg';
  document.getElementById('keyboard-bg').src = 'assets/vectors/keyboard_dark.svg';
  document.getElementById('keyboard-shift-img').src = './assets/vectors/shift_dark.svg';
  document.getElementById('keyboard-backspace-img').src = './assets/vectors/backspace_dark.svg';
}

async function getData() {
  const url = "https://api.api-ninjas.com/v1/randomword?type=adjective";
  try {
    const resp = await fetch(
      url,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "Y+szJgbC2jy7fYrSZxNUtg==7l2aMeTExrYw50sB"
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