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
            <div class="absolute top-3 right-3 w-32 z-10">
                <button id="dropdown-btn" class="flex justify-between items-center bg-gray-200 px-4 py-2 rounded-md">
                    <span class="text-gray-800">Language</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="h-5 w-5 ml-1 text-gray-800">
                        <path d="M12 5v14"></path>
                        <path d="m19 12-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="dropdown" class="hidden mt-2 bg-white rounded-md shadow-lg overflow-hidden">
                    <div><a href="#" class="block px-4 py-2 text-gray-800" data-language-id="en">English</a></div>
                    <div><a href="#" class="block px-4 py-2 text-gray-800" data-language-id="ko">Korean</a></div>
                    <div><a href="#" class="block px-4 py-2 text-gray-800" data-language-id="ch">Chinese</a></div>
                </div>
            </div>
        `;

        this.element.innerHTML = view;
    }


    async handleEvent() {
        // Toggle Dropdown
        document.getElementById('dropdown-btn').addEventListener('click', () => {
            document.getElementById('dropdown').classList.toggle('hidden');
        });

        // Change Language
        document.querySelectorAll('#dropdown a').forEach(item => {
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