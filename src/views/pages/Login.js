import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Login");
    }

    async render() {
        return `
            <div class="bg-gray-100 min-h-screen flex items-center justify-center">
                <div class="max-w-sm rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200">
                    <div class="space-y-2 text-center"><h1 class="text-3xl font-bold">
                        Login
                    </h1>
                        <p class="text-zinc-500">
                            By logging in, you accept our
                            <a class="text-blue-500 hover:text-blue-700" href="#">terms</a>
                            and
                            <a class="text-blue-500 hover:text-blue-700" href="#">privacy policy</a>.
                        </p></div>
                    <div class="space-y-4">
                        <a data-link href="/"
                            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-12 px-4 py-2 w-full bg-black text-white">
                            <div class="flex items-center justify-center text-base">
                                <img class="mr-2" src="/static/img/42_logo.svg" alt="42_logo" width="24" height="24">
                                Login with 42 Intra
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}