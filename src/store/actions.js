// import { io } from "socket.io-client";
import io from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { Position, Game } from "../enum/constant.js";
import { navigateTo } from "../views/utils/router.js";
import store from "./index.js";

function setIntraId(context, payload) {
	context.commit("setIntraId", payload);
}

function logIn(context) {
	context.commit("logIn");
}

function logOut(context) {
	context.commit("logOut");
}

function setLanguage(context, payload) {
	context.commit("setLanguage", payload);
}

function setGameMode(context, payload) {
	context.commit("setGameMode", payload);
}

function setFancyBall(context, payload) {
	context.commit("setFancyBall", payload);
}

function joinGame(context, payload) {
	console.log("intialize socket");

	// const url = "http://localhost:3000/" + payload.gameMode.toLowerCase();
	const url = "http://localhost:8000/game";
	// const url = "http://localhost:3000/game";
	const intraId = payload.intraId;
	const nickname = payload.nickname;
	const speedUp = payload.speedUp;

	const socket = io(url, {
		query: {
			intraId: intraId,
			nickname: nickname,
			isSpeedUp: speedUp,
		},
	});

	context.commit("setSocket", { socket: socket });

	socket.on("connect", () => {
		console.log("on connect: ");
		console.log(`> intraId=${intraId}, nickname=${nickname}, speedUp=${speedUp}`);
	
		context.commit("waitOpponent");
	});

	socket.on("connect_error", (error) => {
		console.error("Connection Error:", error);
	});

	socket.on("userFullEvent", (data) => {
		console.log("on userFullEvent: ");
	
		let userSide =
		intraId === data.leftUser ? Position.LEFT : Position.RIGHT;

		context.commit("setGameInfo", {
			gameInfo: {
				roomName: data.roomName,
				leftUser: data.leftUser,
				rightUser: data.rightUser,
				userSide: userSide,
			},
		});

		console.log(`> roomName=${data.roomName}, leftUser=${data.leftUser}, rightUser=${data.rightUser}, userSide=${userSide}`);

		navigateTo("/game");
		startGame(context);
	});

	socket.on("updateGameStatus", (data) => {
		// console.log("on updateGameStatus: ");
		// console.log(`> gameStatus=${data.gameStatus}`);

		updateGameState(context, {
			ballPosition: data.ballPosition,
			leftPaddlePosition: data.leftPaddlePosition,
			rightPaddlePosition: data.rightPaddlePosition,
		});
	});

	socket.on("updateGameScore", (data) => {
		// console.log("on updateGameScore: ");
		// console.log(`> leftUserScore=${data.leftUserScore}, rightUserScore=${data.rightUserScore}`);

		updateGameScore(context, {
			score: {
				left: data.leftUserScore,
				right: data.rightUserScore,
			},
		});
	});

	socket.on("endGame", (data) => {
		console.log("on endGame: ");
		console.log(`> reason=${data.reason}`);

		endGame(context, { reason: data.reason });
	});
}

function startGame(context) {
	context.commit("startGame");
}

function userIsReady(context) {
	context.state.socket.emit("userReadyEvent", {
		roomName: context.state.gameInfo.roomName,
	});
}

function updateGameState(context, payload) {
	context.commit("updateBallPosition", {
		ballPosition: payload.ballPosition,
	});
	if (context.state.gameInfo.userSide === Position.LEFT) {
		context.commit("updateRightPaddlePosition", {
			rightPaddlePosition: payload.rightPaddlePosition,
		});
	} else {
		context.commit("updateLeftPaddlePosition", {
			leftPaddlePosition: payload.leftPaddlePosition,
		});
	}
}

function updateGameScore(context, payload) {
	context.commit("updateGameScore", payload);
}

// payload.reason: "normal" or "opponentLeft"
function endGame(context, payload) {
	if (payload.reason === "normal") {
		if (context.state.score.left > context.state.score.right) {
			context.commit("setWinner", {
				winner: context.state.gameInfo.leftUser,
			});
		} else {
			context.commit("setWinner", {
				winner: context.state.gameInfo.rightUser,
			});
		}
	}
	
	if (context.state.socket) {
		context.state.socket.disconnect();
		context.commit("setSocket", { socket: null });
	}
	context.commit("setEndReason", { endReason: payload.reason });
	context.commit("endGame");

}

function initPositions(context, payload) {
	context.commit("updateBallPosition", {
		ballPosition: payload.ballPosition,
	});
	context.commit("updateLeftPaddlePosition", {
		leftPaddlePosition: payload.leftPaddlePosition,
	});
	context.commit("updateRightPaddlePosition", {
		rightPaddlePosition: payload.rightPaddlePosition,
	});
}

function initScores(context) {
	context.commit("updateGameScore", {
		score: {
			left: 0,
			right: 0,
		},
	});
}

function moveUserPaddleUp(context) {
	if (context.state.gameStatus !== "playing") return;

	const curPosition =
		context.state.gameInfo.userSide === Position.LEFT
			? context.state.leftPaddlePosition
			: context.state.rightPaddlePosition;
	const newPosition = Math.max(curPosition - 10, Game.PADDLE_HEIGHT / 2);
	
	if (newPosition === undefined) {
		console.log("moveUserPaddleUp: new position undefined");
		return;
	}
	
	console.log(`moveUserPaddleUp: position=${newPosition}`);

	if (context.state.gameInfo.userSide === Position.LEFT) {
		context.commit("updateLeftPaddlePosition", {
			leftPaddlePosition: newPosition,
		});
	} else {
		context.commit("updateRightPaddlePosition", {
			rightPaddlePosition: newPosition,
		});
	}
	context.state.socket.emit("updatePaddlePosition", {
		roomName: context.state.gameInfo.roomName,
		userSide: context.state.gameInfo.userSide,
		paddlePosition: newPosition,
	});
}

function moveUserPaddleDown(context) {
	if (context.state.gameStatus !== "playing") return;

	const curPosition =
		context.state.gameInfo.userSide === Position.LEFT
			? context.state.leftPaddlePosition
			: context.state.rightPaddlePosition;
	const newPosition = Math.min(
		curPosition + 10,
		Game.CANVAS_HEIGHT - Game.PADDLE_HEIGHT / 2
	);
	
	if (newPosition === undefined) {
		console.log("moveUserPaddleDown: new position undefined");
		return;
	}
	console.log(`moveUserPaddleDown: position=${newPosition}`);

	if (context.state.gameInfo.userSide == Position.LEFT) {
		context.commit("updateLeftPaddlePosition", {
			leftPaddlePosition: newPosition,
		});
	} else {
		context.commit("updateRightPaddlePosition", {
			rightPaddlePosition: newPosition,
		});
	}

	context.state.socket.emit("updatePaddlePosition", {
		roomName: context.state.gameInfo.roomName,
		userSide: context.state.gameInfo.userSide,
		paddlePosition: newPosition,
	});
}

// nest.js 서버 테스트 시 사용
function leaveGame(context) {
	context.state.socket.emit("leaveGame", {roomName: store.state.gameInfo.roomName});
	
	if (context.state.socket) {
		context.state.socket.disconnect();
		context.commit("setSocket", { socket: null });
	}
	context.commit("setEndReason", { reason: "opponentLeft" });
	context.commit("endGame");
}

export default {
	setIntraId,
	logIn,
	logOut,
	setLanguage,
	setGameMode,
	setFancyBall,
	joinGame,
	startGame,
	userIsReady,
	endGame,
	initPositions,
	initScores,
	moveUserPaddleDown,
	moveUserPaddleUp,
	leaveGame,
};
