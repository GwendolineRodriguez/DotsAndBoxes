import { Router } from "./router/router.module.js";

class App {
  constructor() {
    const routerOutlet = document.querySelector("main");
    const router = new Router(routerOutlet);
    router.setRoutes([
      {
        path: "/",
        component: "<title-options></title-options>",
      },
      {
        path: "/game",
        component: "<dot-boxes-grid boxNumber='9'></dot-boxes-grid>",
      },
      { path: "/scores", component: "<game-scores></game-scores>" },
    ]);
  }
}

const app = new App();
