import store from "../../store/index.js";
import Component from "../../library/component.js";
import GameCanvas from "./game/gameCanvas.js";
import { navigateTo } from "../utils/router.js";
import { game } from "../utils/languagePack.js";

export default class Game extends Component {
	constructor(params) {
		super({
			store,
			element: document.getElementById("app"),
		});
		this.render();
		this.components = { gameCanvas: new GameCanvas() };

		store.events.subscribe("gameStatusChange", async () =>
			this.showGameOverModal()
		);
	}

	async render() {
		const languageId = store.state.languageId;
		const view = /*html*/ `
            <div id="game-controls">
                <!-- Canvas for the game -->
                <canvas id="gameCanvas"></canvas>

				<!-- Modal for Game Over -->
                <div id="gameOverModal" style="display: none;">
                    <p id="gameOverText"></p>
                    <button id="closeModalButton">${game[languageId].closeButton}</button>
                </div>
            </div>
        `;

		this.element.innerHTML = view;
		this.handleEvent();
	}

	async handleEvent() {
		document
			.getElementById("closeModalButton")
			.addEventListener("click", () => {
				document.getElementById("gameOverModal").style.display = "none";
				navigateTo("/");
			});
	}

	async showGameOverModal() {
		if (store.state.gameStatus !== "ended") return;

		const languageId = store.state.languageId;

		document.getElementById("gameOverModal").style.display = "block";

		console.log("game over: ", store.state.endReason, store.state.winner);
		if (store.state.endReason === "normal") {
			document.getElementById("gameOverText").textContent = `
			${game[languageId].normalEnd} ${store.state.winner}!`;
		} else {
			document.getElementById("gameOverText").textContent = `
			${game[languageId].abnormalEnd}`;
		}
	}
}
