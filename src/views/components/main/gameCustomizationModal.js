import store from "../../../store/index.js";
import Component from "../../../library/component.js";

export default class GameCustomizationModal extends Component {
	constructor(params) {
		super({
			store,
			element: document.getElementById("game-customization-modal"),
		});
	}

	async render() {
		console.log("render game customization modal");

		const languageId = store.state.languageId;

		const languageSet = {
			en: {
				setting: "Setting",
				nickname: "Nickname",
				speed: "Ball Speed",
				normalSpeed: "Normal",
				fastSpeed: "Fast",
				ballDesign: "Ball Design",
				normalBall: "Normal",
				fancyBall: "Fancy",
				close: "Close",
				start: "Start",
			},
			ko: {
				setting: "설정",
				nickname: "닉네임",
				speed: "공 속도",
				normalSpeed: "일반",
				fastSpeed: "빠름",
				ballDesign: "공 디자인",
				normalBall: "일반",
				fancyBall: "특수",
				close: "닫기",
				start: "시작",
			},
			ch: {
				setting: "设置",
				nickname: "昵称",
				speed: "球速",
				normalSpeed: "普通",
				fastSpeed: "快",
				ballDesign: "球设计",
				normalBall: "普通",
				fancyBall: "特殊",
				close: "关闭",
				start: "开始",
			}
		};
		
		const view = `
                    <div class="modal-dialog modal- modal-m modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-body text-center p-lg-4">

			                <form id="game-customization-form">

                                <h3 class="text-dark mt-3">${languageSet[languageId].setting}</h3>
								<div class="row justify-content-center">
									<div class="form-group col-md-6 col-lg-10">
										<label for="nickname" class="col-form-label mt-4">${languageSet[languageId].nickname}</label>
										<input type="text" class="form-control mt-2" id="nickname" required>
									</div>
								</div>

								<!-- speed Option -->
								<div class="btn-group d-flex justify-content-center" role="group" id="speed-option">
									<div class="form-group mt-4">
										<label for="speed" class="col-form-label">${languageSet[languageId].speed}</label>
										<div class="btn-group d-flex justify-content-center mt-2" role="group" aria-label="speed-option">
											<input type="radio" name="speed-btn" class="btn-check" id="normal-speed" checked value="normal">
											<label class="btn btn-outline-primary me-2" for="normal-speed">${languageSet[languageId].normalSpeed}</label>
											<input type="radio" name="speed-btn" class="btn-check" id="fast-speed" value="fast">
											<label class="btn btn-outline-primary" for="fast-speed">${languageSet[languageId].fastSpeed}</label>
										</div>
									</div>
								</div>

								<!-- ballDesign Option -->
								<div class="btn-group d-flex justify-content-center" role="group" id="ball-design-option">
									<div class="form-group mt-4">
										<label for="ballDesign" class="col-form-label">${languageSet[languageId].ballDesign}</label>
										<div class="btn-group d-flex justify-content-center mt-2" role="group" aria-label="ball-design-option">
											<input type="radio" name="ball-design-btn" class="btn-check" id="normal-ball" checked value="normal">
											<label class="btn btn-outline-primary me-2" for="normal-ball">${languageSet[languageId].normalBall}</label>
											<input type="radio" name="ball-design-btn" class="btn-check" id="fancy-ball" value="fancy">
											<label class="btn btn-outline-primary" for="fancy-ball">${languageSet[languageId].fancyBall}</label>
										</div>
									</div>
								</div>
									
								<div class="row mt-4 justify-content-center">
									<div class="col-4 text-center mt-4">
									    <button type="button" class="btn btn-danger w-100" data-bs-dismiss="modal">${languageSet[languageId].close}</button>
									</div>
									<div class="col-4 text-center mt-4 ">
									    <button type="submit" class="btn btn-success w-100" data-bs-dismiss="modal" id="game-start-btn" data-bs-toggle="modal" data-bs-target="#opponent-waiting-modal">${languageSet[languageId].start}</button>
									</div>
								</div>
							</form>
                        </div>
                    </div>
                </div>
		`;

		this.element = document.getElementById("game-customization-modal");
		this.element.innerHTML = view;
		this.handleEvent();
	}

	async handleEvent() {
		// Reset Form When Modal Closes
		this.element.addEventListener("hide.bs.modal", () => {
			this.element.querySelector("#game-customization-form").reset();
		});

		this.element
			.querySelector("#game-start-btn")
			.addEventListener("click", async (event) => {
				// Prevent Default Submit Behavior
				event.preventDefault();

				// Set Fancy Ball State
				const fancyBallValue = this.element.querySelector(
					'#ball-design-option input[name="ball-design-btn"]:checked'
				).value;
				store.dispatch("setFancyBall", { fancyBall: fancyBallValue });

				// TODO: Send Request 완성, nickname 빈칸일 때 에러 처리
				const gameData = {
					accessToken: "",
					gameMode: store.state.gameMode,
					nickname: this.element.querySelector("#nickname").value,
					speedUp: this.element.querySelector(
						'#speed-option input[name="speed-btn"]:checked'
					).value,
				};

				try {
					const response = await fetch("/api/game", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(gameData),
					});
					const data = await response.json();
					console.log(data);
				} catch (err) {
					console.error(err);
				}
			});
	}
}
