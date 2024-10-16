import { setTheme, toggleTheme, setFont, toggleFont } from './theme.mjs';

document.addEventListener("DOMContentLoaded", function(event) {
  setTheme('explanation');
  setFont();
  
  // Set event listener to dynamically detect changes in light/dark mode
  if(window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change',({ matches }) => {
        setTheme('explanation')
      })
  }

  // Functionaliy for light/dark button toggle
  window.toggleTheme = toggleTheme;

  // Functionality for font button toggle
  window.toggleFont = toggleFont;
});

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