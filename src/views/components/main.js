import store from "../../store/index.js";
import Component from "../../library/component.js";
import LanguageSelector from "./main/languageSelector.js";
// import GameModeCard from "./main/gameModeCard.js";
// import GameCustomizationModal from "./main/gameCustomizationModal.js";

export default class Main extends Component {
  constructor(params) {
    super({
      store,
      element: document.getElementById("app"),
    });
    this.renderSkeleton();
    this.components = {
      languageSelector: new LanguageSelector(),
      // gameModeCard1: new GameModeCard({
      //     id: "single-game-mode",
      //     gameMode: "1 VS 1",
      //     description: "Play 1 vs 1 Pong Game."
      //   }),
      // gameModeCard2: new GameModeCard({
      //     id: "double-game-mode",
      //     gameMode: "2 VS 2",
      //     description: "Play 2 vs 2 _Pong Game."
      //   }),
      // gameModeCard3: new GameModeCard({
      //     id: "tournament-game-mode",
      //     gameMode: "Tournament",
      //     description: "Compete in a Pong Tournament."
      //   }),
      // gameModeCard4: new GameModeCard({
      //     id: "ai-game-mode",
      //     gameMode: "AI",
      //     description: "Human vs AI Please beat the Machine!"
      //   }),
      // gameCustomizationModal: new GameCustomizationModal(),
    };
  }

  async renderSkeleton() {
    const view = `
            <main class="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
            
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
                <div id="game-customization-modal" class="hidden"></div>

            </main>
        `;

    this.element.innerHTML = view;
  }
}
