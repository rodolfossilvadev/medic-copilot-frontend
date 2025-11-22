// Estende o tipo global `window` para permitir usar `window.chrome`
export {};

declare global {
  interface Window {
    chrome?: typeof chrome;
  }
}
