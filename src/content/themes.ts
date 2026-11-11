/** Theme ids, in the order the nav chip cycles through them. Colors live in globals.css. */
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

export const THEME_STORAGE_KEY = "theme";

/** Applies the saved theme. Inlined into the page so it runs before first paint. */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t)document.documentElement.dataset.theme=t}catch(e){}`;
