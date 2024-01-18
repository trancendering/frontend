import store from "../../store/index.js";
import Component from "../../library/component.js";
import LanguageSelector from "./main/languageSelector.js";
import GameModeCard from "./main/gameModeCard.js";
import GameCustomizationModal from "./main/gameCustomizationModal.js";

export default class Main extends Component {
    constructor(params) {
        super({
            store,
            element: document.getElementById("app"),
        });
        this.renderSkeleton();
        this.components = {
            languageSelector: new LanguageSelector(),
            gameModeCard1: new GameModeCard({
                id: "single-game-mode",
                gameMode: "1 VS 1",
                description: "Play 1 vs 1 Pong Game.",
            }),
            gameModeCard2: new GameModeCard({
                id: "double-game-mode",
                gameMode: "2 VS 2",
                description: "Play 2 vs 2 Pong Game.",
            }),
            gameModeCard3: new GameModeCard({
                id: "tournament-game-mode",
                gameMode: "Tournament",
                description: "Compete in a Pong Tournament.",
            }),
            gameModeCard4: new GameModeCard({
                id: "ai-game-mode",
                gameMode: "AI",
                description: "Human vs AI Please beat the Machine!",
            }),
            gameCustomizationModal: new GameCustomizationModal(),
        };
    }

    async renderSkeleton() {
        const view = `
            <!-- Language Dropdown -->
            <div id="language-selector"></div>
                
            <main class="d-flex flex-column align-items-center justify-content-center vh-100">
                <!-- Game Mode Selection -->
                <div>
                    <div class="w-100 d-flex justify-content-center align-items-center py-2">
                        <h1 class="display-4 fw-bold">Choose Your Pong Mode</h1>
                    </div>
                    <div class="d-flex flex-row gap-3 mt-3">
                        <div id="single-game-mode" class="rounded border bg-light text-dark shadow-sm w-25" data-v0-t="card"></div>
                        <div id="double-game-mode" class="rounded border bg-light text-dark shadow-sm w-25" data-v0-t="card"></div>
                        <div id="tournament-game-mode" class="rounded border bg-light text-dark shadow-sm w-25" data-v0-t="card"></div>
                        <div id="ai-game-mode" class="rounded border bg-light text-dark shadow-sm w-25" data-v0-t="card"></div>
                    </div>
                </div>
                
                <!-- Game Customization Modal -->
                <div id="game-customization-modal" class="hidden"></div>

            </main>
        `;

        this.element.innerHTML = view;
    }
}
