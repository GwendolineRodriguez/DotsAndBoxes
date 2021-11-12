import Route from "./route.js";

class Router {
  outlet;
  routes;

  constructor(outlet) {
    this.routes = [];
    this.outlet = outlet;
  }

  setRoutes(routeList) {
    if (!routeList || routeList.length === 0) return;
    routeList.forEach(({ path, component, afterRender }) => {
      const route = new Route(path, component, afterRender);
      this.routes.push(route);
    });
    this.navigate("/");
  }

  navigate(path) {
    const route = this.routes.find((route) => route.path == path);
    this.outlet.innerHTML = route.component;
    history.replaceState({}, "", route.path);
    this.updateLinks();
    if (!route.afterRender) return;
    route.afterRender();
  }

  updateLinks() {
    const allLinks = document.querySelectorAll("a");
    allLinks.forEach((link) => {
      if (link.hasListenerAttached) return;
      link.hasListenerAttached = true;
      let path = link.getAttribute("href");
      if (typeof path === "undefined" || path === null) return;
      if (path.match(/^(http|https)/) && typeof URL !== "undefined") return;
      const handler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`%c ${path}`, "color:yellow;");
        this.navigate(path);
      };
      link.addEventListener("click", handler);
    });
  }
}

export { Router, Route };
