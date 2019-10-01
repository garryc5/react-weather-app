export function getCurrentWeather(url) {
    return fetch(url,{mode:"cors"}).then(res => res.json());
  }