/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
   Theme toggle: dark / light mode
---------------------------------------- */

(function () {
  const THEME_KEY = 'theme'; 
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    if (isDark) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');

    
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) {
      if (isDark) {
        icon.src = './images/light_mode_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg';
        icon.alt = 'Switch to light mode';
      } else {
        icon.src = './images/dark_mode_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg';
        icon.alt = 'Switch to dark mode';
      }
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      
    }
  };

  const getSavedTheme = () => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  };

 
  const init = () => {
    const saved = getSavedTheme();
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
      return;
    }

    
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  };

  
  toggle.addEventListener('click', () => {
    const currentlyDark = document.body.classList.contains('dark-mode');
    const next = currentlyDark ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });

  
  try {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener && mq.addEventListener('change', (e) => {
      const saved = getSavedTheme();
      if (saved === 'dark' || saved === 'light') return; 
      applyTheme(e.matches ? 'dark' : 'light');
    });
  } catch (e) {
    
  }

  
  init();

})();
