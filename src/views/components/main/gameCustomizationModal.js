import store from "../../../store/index.js";
import Component from "../../../library/component.js";
import ModalHandler from "../utils/modalHandler.js";

export default class GameCustomizationModal extends Component {
	constructor(params) {
		super({
			store,
			element: document.getElementById("game-customization-modal"),
		});
		this.renderSkeleton();
		this.handleEvent();
	}

	async renderSkeleton() {
		const view = `
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="relative bg-white rounded-lg px-10 py-14 max-w-md mx-auto">
                <button class="close-modal-event absolute top-0 right-0 mt-6 mr-6 text-gray-700 hover:text-gray-500">
                    <img class="mr-2" src="/static/img/close-button.svg" alt="close-button">
                </button>
                <div class="text-3xl font-bold mb-6">Game Customization</div>
                <div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="nickname">
                            Nickname
                        </label>
                        <input
                                type="text"
                                class="flex h-10 border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nickname"
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="speed-up">
                            Speed Up
                        </label>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input id="speed-up" type="checkbox" value="" class="sr-only peer">
                            <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div class="mb-7">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="fancy-ball">
                            Fancy Ball
                        </label>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input id="fancy-ball" type="checkbox" value="" class="sr-only peer">
                            <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
                <div class="flex justify-between">
                    <button class="close-modal-event ring-offset-background focus-visible:ring-offset-2 h-10 inline-flex items-center justify-center rounded-md bg-gray-400 px-7 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600 disabled:pointer-events-none disabled:opacity-50">
                        Cancel
                    </button>
                    <a data-link id="start-game-btn" href="/game"
                            class="close-modal-event ring-offset-background focus-visible:ring-offset-2 h-10 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-800/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                        Start Game
                    </a>
                </div>
            </div>
        </div>
        `;
		this.element.innerHTML = view;
	}

	async handleEvent() {
		// Bind closeModal event handler.
        this.element
            .querySelectorAll('.close-modal-event')
			.forEach((element) => {
				element.addEventListener('click', () => {
					ModalHandler.closeModal('game-customization-modal');
				});
			});

		// Change state when start game button clicked
		this.element
			.querySelector('#start-game-btn')
            .addEventListener('click', async (event) => {
				// Prevent Default Link Behavior
				event.preventDefault();

				// Set Fancy Ball State
				const fancyBallValue = this.element.querySelector('#fancy-ball').value;
                store.dispatch('setFancyBall', { fancyBall: fancyBallValue });

				//TODO: Send Request 완성, nickname 빈칸일 때 에러 처리
				const gameData = {
					accessTocken: '',
					gameMode: this.gameMode,
					nickname: this.element.querySelector('#nickname').value,
					speedUp: this.element.querySelector('#speed-up').value,
				};
				try {
					const response = await fetch('/api/game', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(gameData),
						// fancyBall: ,
					});
					const data = await response.json();
					console.log(data);
				} catch (err) {
					console.error(err);
				}
			});

		document.onkeydown = (event) => {
			event = event || window.event;
			if (event.keyCode === 27) {
				ModalHandler.closeModal('game-customization-modal');
			}
		};
	}
}
