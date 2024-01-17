import store from '../../store/index.js';
import Component from '../../library/component.js'

// 삭제 요망
export default class Logout extends Component {
    constructor() {
        super({
            store,
            element: document.getElementById('logout-btn')
        });
        this.render();
    }

    render() {
        this.element.innerHTML = `
            <button id="btn" class="mt-4 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded">
                Log Out
            </button>
        `;

        this.element.querySelector('#btn').addEventListener('click', () => {
            store.dispatch('logOut');
        });
    }
};