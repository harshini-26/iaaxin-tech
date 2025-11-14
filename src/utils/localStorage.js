export function getFromLocalStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null; 
    return JSON.parse(raw);
  } catch (e) {
    console.warn("localStorage read failed for", key, e);
    return null; 
  }
}

export function setToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("localStorage write failed for", key, e);
  }
}