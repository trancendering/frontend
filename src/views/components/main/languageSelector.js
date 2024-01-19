import store from "../../../store/index.js";
import Component from "../../../library/component.js";

export default class LanguageSelector extends Component {
	constructor() {
		super({
			store,
			element: document.getElementById("language-selector"),
		});
	}

	async render() {
		console.log("render language selector");

		const view = `
            <div class="dropdown position-absolute top-0 end-0">
                <button class="btn dropdown-toggle mt-3 me-3" type="button" id="Language_menu" data-bs-toggle="dropdown" aria-expanded="false">
                    Language
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#" data-language-id="en">English</a></li>
                    <li><a class="dropdown-item" href="#" data-language-id="ko">Korean</a></li>
                    <li><a class="dropdown-item" href="#" data-language-id="ch">Chinese</a></li>
                </ul>
            </div>
        `;

		this.element = document.getElementById("language-selector");
		this.element.innerHTML = view;
		this.handleEvent();
	}

	async handleEvent() {
		// Change Language
		document.querySelectorAll(".dropdown-item").forEach((item) => {
			item.addEventListener("click", async (event) => {
				// Prevent Default Link Behavior
				event.preventDefault();

				// Get Language Id (en, ko, ch)
				const languageId = item.dataset.languageId;

				// Change Language State
				store.dispatch("setLanguage", { languageId });

				// Language Change Post Request
				try {
					const response = await fetch("/api/language", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ languageId }),
					});
					const data = await response.json();
					console.log(data);
				} catch (err) {
					console.error(err);
				}
			});
		});
	}
}
