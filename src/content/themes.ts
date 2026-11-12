/** theme ids, in the order the nav chip cycles them. colors live in globals.css */
export const THEMES = [
  "cobalt",
  "tangerine",
  "lime",
  "bubblegum",
  "grape",
  "paper",
  "sky",
  "midnight",
] as const;

/** a theme picked by hand, kept for the visit (session storage) so a new visit gets a fresh roll */
export const THEME_STORAGE_KEY = "theme";

/** the last random pick, per tab, so a reload never lands on the same theme twice */
const RANDOM_STORAGE_KEY = "random-theme";

/**
 * applies the theme picked this visit, or a random one. inlined so it runs
 * before first paint. without js it stays cobalt, the default
 */
export const THEME_INIT_SCRIPT = `try{var s=sessionStorage,t=s.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(!t){var l=s.getItem(${JSON.stringify(RANDOM_STORAGE_KEY)}),o=${JSON.stringify(THEMES)}.filter(function(x){return x!==l});t=o[Math.floor(Math.random()*o.length)];s.setItem(${JSON.stringify(RANDOM_STORAGE_KEY)},t)}document.documentElement.dataset.theme=t}catch(e){}`;
