export function getLocalStorage(key: string) {
  // is testing if we are in the browser
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
}

export function setLocalStorage(key: string, value: string) {
  // is testing if we are in the browser
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value);
  }
}
