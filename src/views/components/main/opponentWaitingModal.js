import store from "../../../store/index.js";
import Component from "../../../library/component.js";

export default class OpponentWaitingModal extends Component {
	constructor(params) {
		super({
			store,
			element: document.getElementById("opponent-waiting-modal"),
		});
	}

	async render() {
		console.log("render opponenet wating modal");

		const languageId = store.state.languageId;

		const languageSet = {
            en : {
                waiting: "Waiting",
                description: "Waiting another player",
                cancel: "Cancel",
            },
            ko : {
                waiting: "대기중",
                description: "상대방을 기다리는 중입니다",
                cancel: "취소",
            },
            ch : {
                waiting: "等待",
                description: "等待另一位玩家",
                cancel: "取消",
            },
		}

		const view = `
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-body text-center p-lg-4">
                        <!-- Loading Spinner Wrapper-->
                        <div class="loader text-center mt-3">
                            <!-- Animated Spinner -->
                            <div class="lds-roller mb-3">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <h4 class="text-center mt-3">${languageSet[languageId].waiting} 1 / 2</h4>
                        <p class="mt-3">${languageSet[languageId].description}</p>
                        <button id="cancel-match-btn" type="button" class="btn btn-sm mt-3 btn-secondary" data-bs-dismiss="modal">${languageSet[languageId].cancel}</button>
                    </div>
                </div>
            </div>
		`;

		this.element = document.getElementById("opponent-waiting-modal");
		this.element.innerHTML = view;
		this.handleEvent();
	}

	async handleEvent() {
		document
			.getElementById("cancel-match-btn")
			.addEventListener("click", async (event) => {
				console.log("cancel match making");

				// Prevent Default Link Behavior
				event.preventDefault();

				// Reset Fancy Ball State
				store.dispatch("setFancyBall", { fancyBall: "normal" });

				// Cancel Match Making Post Request
				// TODO 소켓 Connection 끊는 로직
			});
	}
}
