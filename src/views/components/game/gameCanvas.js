import store from "../../../store/index.js";
import Component from "../../../library/component.js";
import { Game } from "../../../enum/constant.js";

export default class gameCanvas extends Component {
	constructor(params) {
		super({
			store,
			element: document.getElementById("gameCanvas"),
		});
		this.canvas = this.element;
		this.ctx = this.canvas.getContext("2d");

		store.dispatch("initPositions", {
			ballPosition: {
				x: this.canvas.width / 2,
				y: this.canvas.height / 2,
			},
			leftPaddle: this.canvas.height / 2,
			rightPaddle: this.canvas.height / 2,
		});

		this.render();
		store.events.subscribe("ballPositionChange", async () => this.render());
		store.events.subscribe("scoreChange", async () => this.render());
	}

	async render() {
		const newCanvas = document.getElementById("gameCanvas");
		if (this.canvas !== newCanvas) {
			this.element = this.canvas = newCanvas;
			this.ctx = this.canvas.getContext("2d");
			this.handleEvent();
		}

		this.drawObjects();
		this.drawScores();
	}

	async handleEvent() {
		document.addEventListener("keydown", (e) => {
			if (e.key == "ArrowUp") {
				store.dispatch("moveUserPaddleUp");
			} else if (e.key == "ArrowDown") {
				store.dispatch("moveUserPaddleDown");
			}
		});
	}

	async drawObjects() {
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawPaddle("left");
		this.drawPaddle("right");
		this.drawBall();
	}

	async drawPaddle(side) {
		const x = side === "left" ? 0 : this.canvas.width - Game.PADDLE_WIDTH;
		const y =
			side === "left" ? store.state.leftPaddle : store.state.rightPaddle;

		this.ctx.beginPath();
		this.ctx.rect(
			x,
			y - Game.PADDLE_HEIGHT / 2,
			Game.PADDLE_WIDTH,
			Game.PADDLE_HEIGHT
		);
		this.ctx.fillStyle = "#FFF";
		this.ctx.fill();
		this.ctx.closePath();
	}

	async drawBall() {
		const { x, y } = store.state.ballPosition;
		this.ctx.beginPath();
		this.ctx.arc(x, y, Game.BALL_RADIUS, 0, Math.PI * 2);
		this.ctx.fillStyle = "#FFF";
		this.ctx.fill();
		this.ctx.closePath();
	}

	async drawScores() {
		this.ctx.font = "20px Arial";

		const leftUserText = `${store.state.gameInfo.leftUser}: ${store.state.score.left}`;
		const rightUserText = `${store.state.gameInfo.rightUser}: ${store.state.score.right}`;

		const leftUserTextX = 30;
		const rightUserTextX =
			this.canvas.width - 30 - this.ctx.measureText(rightUserText).width;

		this.ctx.fillText(leftUserText, leftUserTextX, 30);
		this.ctx.fillText(rightUserText, rightUserTextX, 30);
	}
}
