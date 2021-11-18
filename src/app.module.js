import { Router } from "./router/router.module.js";

class App {
  constructor() {
    // TODO: construct dotboxgame and options here to pass data from options to dotboxgrid
    // step2: create function here to set options to pass to dotbox and create new dotbox Object here, then navigate from here, remove <a> link from options play button
    const routerOutlet = document.querySelector("main");
    const router = new Router(routerOutlet);
    router.setRoutes([
      {
        path: "/",
        component: "<game-options></game-options>",
      },
      {
        path: "/game",
        component: "<dot-boxes-grid boxNumber='9'></dot-boxes-grid>",
      },
      { path: "/scores", component: "<game-scores></game-scores>" },
    ]);
    this.registerServiceWorker();
  }

  registerServiceWorker() {
    const sw = new URL("./sw.js", import.meta.url);
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register(sw).then(
          function (registration) {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("ServiceWorker registration failed: ", err);
          }
        );
      });
    }
  }
}

const app = new App();
