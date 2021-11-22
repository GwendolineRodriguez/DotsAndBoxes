class Route {
  constructor(path, component, afterRender) {
    this.path = path;
    this.component = component;
    this.afterRender = afterRender;
  }
}

export default Route;
