import store from "../../../store/index.js";
import Component from "../../../library/component.js";

export default class Login extends Component {
  constructor(params) {
    super({
      store,
      element: document.getElementById("login-btn"),
    });
    this.renderSkeleton();
  }

  async renderSkeleton() {
    const view = `
            <a data-link href="/"
                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-12 px-4 py-2 w-full bg-black text-white">
                <div class="flex items-center justify-center text-base">
                    <img class="mr-2" src="../../../static/img/42_logo.svg" alt="42_logo" width="24" height="24">
                    Login with 42 Intra
                </div>
            </a>
        `;

    this.element.innerHTML = view;
  }

  async afterRender() {
    this.element.addEventListener("click", () => {
      store.dispatch("logIn");
    });
  }
}
