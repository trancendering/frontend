import store from "../../store/index.js";
import Component from "../../library/component.js";
import LoginButton from "./login/loginButton.js";

export default class Login extends Component {
    constructor(params) {
        super({
            store,
            element: document.getElementById('app')
        });
        this.render_skeleton();
        this.components = {loginButton: new LoginButton()};
    }

    async render_skeleton() {
        const view = `
            <div class="bg-gray-100 min-h-screen flex items-center justify-center">
                <div class="max-w-sm rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200">
                    <div class="space-y-2 text-center">
                        <h1 class="text-3xl font-bold">
                            Login
                        </h1>
                    </div>
                    <div id="login-btn" class="space-y-4"></div>
                </div>
            </div>
        `;

        this.element.innerHTML = view;
    }
}