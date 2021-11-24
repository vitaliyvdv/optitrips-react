import { register } from "register-service-worker";

if (window.location.hostname.includes(process.env.APP_HOSTNAME)) {
  register(`/service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\nFor more details, visit htt" + "ps://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
      location.reload(true);
    },
    offline() {
      console.log("No internet connection found. App is running in offline mode.");
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
