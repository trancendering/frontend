import store from "../../../store/index.js";
import Component from "../../../library/component.js";

export default class Login extends Component {
    constructor(params) {
        super({
            store,
            element: document.getElementById("login-btn"),
        });
        this.renderSkeleton();
        this.handleEvent();
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

    async handleEvent() {
        this.element.addEventListener("click", async (event) => {
            // Prevent Default Link Behavior
            event.preventDefault();

            // TODO 아래의 부분은 로그인 성공 후 실행되어야 하므로, 로그인 성공 후 실행되도록 수정해야 함.
            // Change isLoggedIn State
            store.dispatch("logIn");

            // Language State Get Request
            try {
                const response = await fetch("/api/language", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                console.log(data);
                if (data.status === "success") {
                    store.dispatch("setLanguage", { languageId: data.languageId });
                } else {
                    console.error(data);
                }
            } catch (error) {
                console.error(error);
            }
        });
    }
}
