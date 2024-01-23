// import { io } from "socket.io-client";
import io from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
// import { Position } from "../enums/positionEnum.js";
import Position from "../enums/positionEnum.js";
// import { GameElement } from "../enums/gameElementEnum.js";
import GameElement from "../enums/gameElementEnum.js";
import { navigateTo } from "../views/utils/router.js";

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
	const url = "http://localhost:3000/game";
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

	socket.on("connect_error", (error) => {
		console.error("Connection Error:", error);
	});

	socket.on("userFullEvent", (data) => {
		console.log("userFullEvent");

		console.log(intraId, data.intraIds.left, data.intraIds.right);
		let userSide =
			intraId === data.intraIds.left ? Position.LEFT : Position.RIGHT;
		console.log(userSide);
		context.commit("setGameInfo", {
			gameInfo: {
				roomName: data.roomName,
				leftUser: data.nicknames.left,
				rightUser: data.nicknames.right,
				userSide: userSide,
			},
		});

		console.log(
			`roomName: ${data.roomName}, leftUser: ${data.nicknames.left}, rightUser: ${data.nicknames.right}, userSide: ${userSide}`
		);
		navigateTo("/game");
		startGame(context);
	});

	socket.on("updateGameStatus", (data) => {
		updateGameState(context, {
			ballPosition: data.ballPosition,
			leftPaddle: data.paddlePositions.left,
			rightPaddle: data.paddlePositions.right,
		});
	});

	socket.on("updateGameScore", (data) => {
		updateGameScore(context, {
			score: {
				left: data.score.left,
				right: data.score.right,
			},
		});
		console.log(data.isEnded);
		if (data.isEnded === true) {
			console.log("game ended is true");
			endGame(context, {normalEnd: true});
		}
	});

	socket.on("disconnectRoom", (data) => {
		console.log("disconnectRoom");
		endGame(context, {normalEnd: false});
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
	if (context.state.userSide === Position.LEFT) {
		context.commit("updateRightPaddlePosition", {
			rightPaddle: payload.rightPaddle,
		});
	} else {
		context.commit("updateLeftPaddlePosition", {
			leftPaddle: payload.leftPaddle,
		});
	}
}

function updateGameScore(context, payload) {
	console.log("action: updateGameScore");
	context.commit("updateGameScore", payload);
}

function endGame(context, payload) {
	console.log("action: endGame");
	if (payload.normalEnd === true) {
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
	context.commit("endGame");
}

function initPositions(context, payload) {
	context.commit("updateBallPosition", {
		ballPosition: payload.ballPosition,
	});
	context.commit("updateLeftPaddlePosition", {
		leftPaddle: payload.leftPaddle,
	});
	context.commit("updateRightPaddlePosition", {
		rightPaddle: payload.rightPaddle,
	});
}

function moveUserPaddleUp(context) {
	const curPosition =
		context.state.gameInfo.userSide === Position.LEFT
			? context.state.leftPaddle
			: context.state.rightPaddle;
	const newPosition = Math.max(
		curPosition - 20,
		GameElement.PADDLE_HEIGHT / 2
	);
	if (newPosition === undefined) {
		console.log("moveUserPaddleUp: new position undefined");
		return;
	}
	if (context.state.gameInfo.userSide === Position.LEFT) {
		context.commit("updateLeftPaddlePosition", { leftPaddle: newPosition });
	} else {
		context.commit("updateRightPaddlePosition", {
			rightPaddle: newPosition,
		});
	}
	context.state.socket.emit("updatePaddlePosition", {
		roomName: context.state.gameInfo.roomName,
		userSide: context.state.gameInfo.userSide,
		paddlePosition: newPosition,
	});
}

function moveUserPaddleDown(context) {
	const curPosition =
		context.state.gameInfo.userSide === Position.LEFT
			? context.state.leftPaddle
			: context.state.rightPaddle;
	const newPosition = Math.min(
		curPosition + 20,
		GameElement.CANVAS_HEIGHT - GameElement.PADDLE_HEIGHT / 2
	);
	console.log(GameElement.CANVAS_HEIGHT - GameElement.PADDLE_HEIGHT / 2);
	console.log("new position: " + newPosition);
	if (newPosition === undefined) {
		console.log("moveUserPaddleDown: new position undefined");
		return;
	}
	if (context.state.gameInfo.userSide == Position.LEFT) {
		context.commit("updateLeftPaddlePosition", { leftPaddle: newPosition });
	} else {
		context.commit("updateRightPaddlePosition", {
			rightPaddle: newPosition,
		});
	}

	context.state.socket.emit("updatePaddlePosition", {
		roomName: context.state.gameInfo.roomName,
		userSide: context.state.gameInfo.userSide,
		paddlePosition: newPosition,
	});
}

function leaveGame(context) {
	console.log("leaveGame");
	socket.emit("leaveGameEvent", {
		roomName: context.state.gameInfo.roomName,
		userSide: context.state.gameInfo.userSide,
	});
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
	moveUserPaddleDown,
	moveUserPaddleUp,
	leaveGame,
};
