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
    this.render_skeleton();
    this.components = {
      languageSelector: new LanguageSeblector(),
      gameModeCard1: new GameModeCard("1 vs 1"),
      gameModeCard2: new GameModeCard("2 vs 2"),
      gameModeCard3: new GameModeCard("Tournament"),
      gameModeCard4: new GameModeCard("AI"),
      gameCustomizationModal: new GameCustomizationModal(),
    };
  }

  async render_skeleton() {
    const view = `
            <main class="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
            
                <!-- User Status Indicator -->
                <div id="user-status"></div>
                
                <!-- LogOut Button -->
                <div id="logout-btn"></div>
                
                <!-- Language Dropdown -->
                <div id="language-selector"></div>
                
                <!-- Game Mode Selection -->
                <div>
                    <div class="w-full flex justify-center items-center p-4">
                        <h1 class="text-4xl font-bold">Choose Your Pong Game Mode</h1>
                    </div>
                    <div class="flex flex-row gap-8 mt-8">
                        <div id="single-game-mode"></div>
                        <div id="double-game-mode"></div>
                        <div id="tournament-game-mode"></div>
                        <div id="ai-game-mode"></div>
                    </div>
                </div>
                
                <!-- Game Customization Modal -->
                <div id="game-customization-modal"></div>

            </main>
        `;

    this.element.innerHTML = view;
  }
}
