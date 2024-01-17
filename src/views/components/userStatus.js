import store from '../../store/index.js';
import Component from '../../library/component.js'

// 삭제 요망
export default class UserStatus extends Component {
    constructor() {
        super({
            store,
            element: document.getElementById('user-status')
        });
        this.render();
    }

    render() {
        this.element.innerHTML = `
            <div class="absolute top-3 left-3">
                <span class="px-4 py-2 rounded-md ${store.state.isLoggedIn === true ? 'bg-green-200' : 'bg-red-200'} text-gray-800">
                    ${store.state.isLoggedIn === true ? 'Logged In' : 'Logged Out'}
                </span>
            </div>
        `;
    }
};