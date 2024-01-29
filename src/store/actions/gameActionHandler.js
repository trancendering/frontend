import io from "socket.io-client";
import { Side, Game } from "../../enum/constant.js";

/**
 * @class gameActionHandler
 * @desc 게임 관련 액션을 처리하는 클래스
 * @methods
 * connectSocket, bindSocketEvents, printSocketError: 소켓 연결 관련 메서드
 * startGame, endGame: 게임 시작/종료 관련 메서드(인터페이스)
 * initScores, initPositions: 게임 초기화 관련 메서드
 * updateGameContext, updateGameState, updateGameScore: 게임 상태 업데이트 메서드
 * emitUserReadyEvent: 유저가 준비되었다는 이벤트를 서버로 보내는 메서드
 * updatePaddlePosition: 패들 위치 업데이트 메서드
 * moveUserPaddleUp, moveUserPaddleDown: 패들 이동 메서드
 */
export default class gameActionHandler {
	constructor(context, payload) {
		this.context = context;
		this.socket = null;
		this.roomName = "";
		this.intraIdList = [];
		this.nicknameList = [];
		this.matchQueue = []; // 매칭 대기열
		this.userIndex = 0;
		this.userSide = 0;
	}

	async connectSocket(payload) {
		const url = `http://localhost:8000/${payload.namespace}`;

		const socket = io(url, {
			query: {
				intraId: payload.intraId,
				nickname: payload.nickname,
				isSpeedUp: payload.speedUp,
			},
		});

		this.socket = socket;
		// this.context.commit("setSocket", { socket: socket });
		return socket;
	}

	async bindSocketEvents() {
		this.socket.on("connect_error", (error) => {
			this.printSocketError(error);
		});
		this.socket.on("userFullEvent", (data) => {
			this.startGame(data);
		});
		this.socket.on("updateGameStatus", (data) => {
			this.updateGameState(data);
		});
		this.socket.on("updateGameScore", (data) => {
			this.updateGameScore(data);
		});
		this.socket.on("endGame", (data) => {
			this.endGame({ reason: data.reason });
		});
	}

	async printSocketError(error) {
		console.error("Connection Error:", error);
	}

	async startGame(payload) {}

	async endGame(payload) {}

	async initScores(context) {
		this.context.commit("updateLeftUserScore", { leftUserScore: 0 });
		this.context.commit("updateRightUserScore", { rightUserScore: 0 });
	}

	async initPositions() {
		this.context.commit("updateBallPosition", {
			ballPosition: {
				x: Game.CANVAS_WIDTH / 2,
				y: Game.CANVAS_HEIGHT / 2,
			},
		});
		this.context.commit("updateLeftPaddlePosition", {
			leftPaddlePosition: Game.CANVAS_HEIGHT / 2,
		});
		this.context.commit("updateRightPaddlePosition", {
			rightPaddlePosition: Game.CANVAS_HEIGHT / 2,
		});
	}

	async updateGameContext() {
		const leftUserIndex = this.matchQueue[0];
		const rightUserIndex = this.matchQueue[1];
		const participated =
			leftUserIndex === this.userIndex ||
            rightUserIndex === this.userIndex;
        
        console.log("updateGameContext: ");
        console.log(`> leftUserIndex=${leftUserIndex}, rightUserIndex=${rightUserIndex}`);
        console.log(`> participated=${participated}`);
        console.log(`> leftUser=${this.nicknameList[leftUserIndex]}, rightUser=${this.nicknameList[rightUserIndex]}`);

		this.context.commit("setGameContext", {
			gameContext: {
				roomName: this.roomName,
				leftUser: this.nicknameList[leftUserIndex],
				rightUser: this.nicknameList[rightUserIndex],
                participated: participated,
                userSide: this.userSide,
			},
		});
	}

	async updateGameState(payload) {
		const context = this.context;
		const state = context.state;

		context.commit("updateBallPosition", {
			ballPosition: payload.ballPosition,
		});

		if (
			state.gameContext.participated === false ||
			state.gameContext.userSide === Side.LEFT
		) {
			context.commit("updateRightPaddlePosition", {
				rightPaddlePosition: payload.rightPaddlePosition,
			});
        }
        if (
            state.gameContext.participated === false ||
            state.gameContext.userSide === Side.RIGHT
        ) {
			context.commit("updateLeftPaddlePosition", {
				leftPaddlePosition: payload.leftPaddlePosition,
			});
		}
	}

	async updateGameScore(payload) {
		const context = this.context;

		context.commit("updateLeftUserScore", {
			leftUserScore: payload.leftUserScore,
		});
		context.commit("updateRightUserScore", {
			rightUserScore: payload.rightUserScore,
		});
	}

    async emitUserReadyEvent() {
        const state = this.context.state;

		this.socket.emit("userReadyEvent", {
			roomName: state.gameContext.roomName,
		});
	}

	async updatePaddlePosition(payload) {
		const context = this.context;
		const state = this.context.state;
		const paddlePosition = payload.paddlePosition;

		if (state.gameContext.userSide === Side.LEFT) {
			context.commit("updateLeftPaddlePosition", {
				leftPaddlePosition: paddlePosition,
			});
		} else {
			context.commit("updateRightPaddlePosition", {
				rightPaddlePosition: paddlePosition,
			});
		}
		this.socket.emit("updatePaddlePosition", {
			roomName: state.gameContext.roomName,
			userSide: state.gameContext.userSide,
			paddlePosition: paddlePosition,
		});
	}

	async moveUserPaddleUp() {
		const context = this.context;
		const state = context.state;

		const curPosition =
			state.gameContext.userSide === Side.LEFT
				? state.leftPaddlePosition
				: state.rightPaddlePosition;
		const newPosition = Math.min(curPosition + 10, Game.CANVAS_HEIGHT - Game.PADDLE_HEIGHT / 2);
		if (newPosition === undefined) {
			console.log("moveUserPaddleUp: new position undefined");
			return;
		}
		console.log(`moveUserPaddleUp: position=${newPosition}`);
		this.updatePaddlePosition({ paddlePosition: newPosition });
	}

	async moveUserPaddleDown() {
		const context = this.context;
		const state = context.state;

		const curPosition =
			state.gameContext.userSide === Side.LEFT
				? state.leftPaddlePosition
				: state.rightPaddlePosition;
		const newPosition = Math.max(curPosition - 10, Game.PADDLE_HEIGHT / 2);
		if (newPosition === undefined) {
			console.log("moveUserPaddleDown: new position undefined");
			return;
		}
		console.log(`moveUserPaddleDown: position=${newPosition}`);
		this.updatePaddlePosition({ paddlePosition: newPosition });
	}
}
