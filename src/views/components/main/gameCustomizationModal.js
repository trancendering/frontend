import store from "../../../store/index.js";
import Component from "../../../library/component.js";

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
                    <div class="modal-dialog modal- modal-m modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-body text-center p-lg-4">

			                <form id="game-customization-form">

                                <h3 class="text-dark mt-3">Setting</h3>
								<div class="row justify-content-center">
									<div class="form-group col-md-6 col-lg-10">
										<label for="nickname" class="col-form-label mt-4">Nickname</label>
										<input type="text" class="form-control mt-2" id="nickname">
									</div>
								</div>

								<!-- speed Option -->
								<div class="btn-group d-flex justify-content-center" role="group" id="speed-option">
									<div class="form-group mt-4">
										<label for="speed" class="col-form-label">Ball Speed</label>
										<div class="btn-group d-flex justify-content-center mt-2" role="group" aria-label="speed-option">
											<input type="radio" name="speed-btn" class="btn-check" id="normal-speed" checked value="normal">
											<label class="btn btn-outline-primary me-2" for="normal-speed">Normal</label>
											<input type="radio" name="speed-btn" class="btn-check" id="fast-speed" value="fast">
											<label class="btn btn-outline-primary" for="fast-speed">Fast</label>
										</div>
									</div>
								</div>

								<!-- ballDesign Option -->
								<div class="btn-group d-flex justify-content-center" role="group" id="ball-design-option">
									<div class="form-group mt-4">
										<label for="ballDesign" class="col-form-label">Ball Design</label>
										<div class="btn-group d-flex justify-content-center mt-2" role="group" aria-label="ball-design-option">
											<input type="radio" name="ball-design-btn" class="btn-check" id="normal-ball" checked value="normal">
											<label class="btn btn-outline-primary me-2" for="normal-ball">Normal</label>
											<input type="radio" name="ball-design-btn" class="btn-check" id="fancy-ball" value="fancy">
											<label class="btn btn-outline-primary" for="fancy-ball">Fancy</label>
										</div>
									</div>
								</div>
									
								<div class="row mt-4 justify-content-center">
									<div class="col-4 text-center mt-4">
									  <button type="button" class="btn btn-danger w-100" data-bs-dismiss="modal">Close</button>
									</div>
									<div class="col-4 text-center mt-4 ">
									<!-- TODO: data-bs-toggle="modal" data-bs-target="#game-waiting-modal"로 수정-->
									  <button type="button" data-link href="/game" class="btn btn-success w-100" data-bs-dismiss="modal" id="game-start-btn">Start</button>
									</div>
								</div>
							</form>
                        </div>
                    </div>
                </div>
		`;

		this.element.innerHTML = view;
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

				//TODO: Send Request 완성, nickname 빈칸일 때 에러 처리
				const gameData = {
					accessTocken: "",
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
