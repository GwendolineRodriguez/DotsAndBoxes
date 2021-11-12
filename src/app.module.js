import { Router } from "./core/router/router.module.js";

class App {
  constructor() {
    const routerOutlet = document.querySelector("main");
    const router = new Router(routerOutlet);
    router.setRoutes([
      {
        path: "/",
        component: dashboard.component,
        afterRender: dashboard.addEventListeners,
      },
      { path: "/game", component: game.component },
    ]);
    document.querySelector("nav").innerHTML = navbar.component;
    router.updateLinks();
  }
}

const app = new App();
