function registerServiceWorker() {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(() => console.log('Service worker registered'))
      .catch(e => console.log('Service worker not registered', e));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    registerServiceWorker();
  }
});
