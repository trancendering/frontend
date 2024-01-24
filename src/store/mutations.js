// login
function setIntraId(state, payload) {
	state.intraId = payload.intraId;
	return state;
}

function logIn(state) {
	state.isLoggedIn = true;
	return state;
}

function logOut(state) {
	state.isLoggedIn = false;
	return state;
}

// main
function setLanguage(state, payload) {
	state.languageId = payload.languageId;
	return state;
}

function setGameMode(state, payload) {
	state.gameMode = payload.gameMode;
	return state;
}

function setFancyBall(state, payload) {
	state.fancyBall = payload.fancyBall;
	return state;
}

// game start
function setSocket(state, payload) {
	state.socket = payload.socket;
	return state;
}

function setGameInfo(state, payload) {
	state.gameInfo = payload.gameInfo;
	return state;
}

function waitOpponent(state) {
	state.gameStatus = "waiting";
	return state;
}

function startGame(state) {
	state.gameStatus = "playing";
	return state;
}

// real-time game update
function updateBallPosition(state, payload) {
	state.ballPosition = payload.ballPosition;
	return state;
}

function updateLeftPaddlePosition(state, payload) {
	state.leftPaddlePosition = payload.leftPaddlePosition;
	return state;
}

function updateRightPaddlePosition(state, payload) {
	state.rightPaddlePosition = payload.rightPaddlePosition;
	return state;
}

function updateGameScore(state, payload) {
	state.score = payload.score;
	return state;
}

// game end
function endGame(state) {
	state.gameStatus = "ended";
	return state;
}

function setEndReason(state, payload) {
	state.endReason = payload.endReason;
	return state
}

function setWinner(state, payload) {
	state.winner = payload.winner;
	return state;
}

export default {
	// login
	setIntraId,
	logIn,
	logOut,
	//main
	setLanguage,
	setGameMode,
	setFancyBall,
	// game start
	setSocket,
	setGameInfo,
	waitOpponent,
	startGame,
	// real-time update
	updateBallPosition,
	updateLeftPaddlePosition,
	updateRightPaddlePosition,
	updateGameScore,
	// game end
	endGame,
	setEndReason,
	setWinner,
};
