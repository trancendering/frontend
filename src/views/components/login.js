import store from "../../store/index.js";
import Component from "../../library/component.js";
import LoginButton from "./login/loginButton.js";

export default class Login extends Component {
	constructor(params) {
		super({
			store,
			element: document.getElementById("app"),
		});
		this.render();
		this.components = { loginButton: new LoginButton() };
	}

	async render() {
		console.log("render login page");
		const view = `
            <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
                  <div class="card shadow p-3 mb-5 bg-white rounded" style="max-width: 18rem;">
                      <div class="card-body text-center">
                          <h1 class="h3 mb-3 font-weight-bold">Login</h1>
                      </div>
                      <div id="login-btn"></div>
                  </div>
            </div>
        `;

		this.element.innerHTML = view;
	}
}
