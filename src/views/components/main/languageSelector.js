import store from "../../../store/index.js";
import Component from "../../../library/component.js";

export default class LanguageSelector extends Component {
    constructor() {
        super({
            store,
            element: document.getElementById('language-selector')
        });
        this.renderSkeleton();
        this.handleEvent();
    }

    async renderSkeleton() {
        const view = `
            <nav class="navbar navbar-expand navbar-light me align-items-center">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="language_menu" role="button" data-bs-toggle="dropdown">
                                    Language
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="language_menu">
                                    <li><a class="dropdown-item" href="#" data-language-id="en">English</a></li>
                                    <li><a class="dropdown-item" href="#" data-language-id="ko">Korean</a></li>
                                    <li><a class="dropdown-item" href="#" data-language-id="ch">Chinese</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;

        this.element.innerHTML = view;
    }


    async handleEvent() {
        // Change Language
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', async (event) => {
                // Prevent Default Link Behavior
                event.preventDefault();

                // Get Language Id (en, ko, ch)
                const languageId = item.dataset.languageId;

                // Change Language State
                store.dispatch('setLanguage', {languageId});

                // Language Change Post Request
                try {
                    const response = await fetch('/api/language', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({languageId})
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