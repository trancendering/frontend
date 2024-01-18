/**
 * @class Component
 * @description Base class of a component
 */
export default class Component {
  constructor(props = {}) {
    props.store.events.subscribe("stateChange", () => this.render());
    this.element = props.element;
    this.components = {};
  }

  async renderSkeleton() {}

  async render() {
    for (let component in this.components) {
      this.components[component].render();
    }
  }

  async afterRender() {
    for (let component in this.components) {
      this.components[component].afterRender();
    }
  }
}