/**
 * @class Component
 * @description Base class of a component
 */
export default class Component {
    constructor(props = {}) {
        props.store.events.subscribe('stateChange', () => this.render());
        this.element = props.element;
        this.components = {};
    }

    async render_skeleton() {
    }

    async render() {
        for (let component in this.components) {
            this.components[component].render();
        }
    }

    async after_render() {
        for (let component in this.components) {
            this.components[component].after_render();
        }
    }
}
