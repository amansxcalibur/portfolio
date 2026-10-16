export const scrollToHash = (elementId: string): void => {
   const element = document.getElementById(elementId);
   element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
   });
};