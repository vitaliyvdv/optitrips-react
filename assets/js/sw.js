import { setCacheNameDetails, skipWaiting, clientsClaim } from "workbox-core";
import { CacheableResponsePlugin } from "workbox-cacheable-response/CacheableResponsePlugin";
import { NetworkFirst } from "workbox-strategies";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import * as googleAnalytics from "workbox-google-analytics";

setCacheNameDetails({ prefix: "optitrips", googleAnalytics: "ga" });
skipWaiting();
clientsClaim();
cleanupOutdatedCaches();
googleAnalytics.initialize();

registerRoute(
  new RegExp("https://www." + process.env.APP_HOSTNAME + "/"),
  new NetworkFirst({ plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })] })
);

//workbox.precaching.precacheAndRoute(self.__precacheManifest);
precacheAndRoute(self.__WB_MANIFEST);
