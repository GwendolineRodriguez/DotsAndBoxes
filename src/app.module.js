import { Router } from "./router/router.module.js";

class App {
  constructor() {
    const routerOutlet = document.querySelector("main");
    const router = new Router(routerOutlet);
    if (!localStorage.getItem("playerName")) {
      localStorage.setItem("playerName", "Player 1 👑");
      localStorage.setItem("board", "9");
      localStorage.setItem("difficulty", "easy");
    }
    router.setRoutes([
      {
        path: "/",
        component: "<game-options></game-options>",
      },
      {
        path: "/game",
        component: "<dot-boxes-grid></dot-boxes-grid>",
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
