export default {
	setIntraId(state, payload) {
		state.intraId = payload.intraId;

		return state;
	},
	logIn(state) {
		state.isLoggedIn = true;

		return state;
	},
	logOut(state) {
		state.isLoggedIn = false;

		return state;
	},
	setLanguage(state, payload) {
		state.languageId = payload.languageId;

		return state;
	},
	setGameMode(state, payload) {
		state.gameMode = payload.gameMode;

		return state;
	},
	setFancyBall(state, payload) {
		state.fancyBall = payload.fancyBall;

		return state;
	},
	setSocket(state, payload) {
        state.socket = payload.socket;

        return state;
	},
	setGameInfo(state, payload) {
		state.gameInfo = payload.gameInfo;
		// state.roomName = payload.roomName;
		// state.leftUser = payload.leftUser;
		// state.rightUser = payload.rightUser;
		// state.userSide = payload.userSide;

		return state;
	},
	startGame(state) {
		state.gameStatus = 'playing';

		return state;
	},
	updateBallPosition(state, payload) {
		state.ballPosition = payload.ballPosition;

		return state;
	},
	updateLeftPaddlePosition(state, payload) {
		state.leftPaddle = payload.leftPaddle;

		return state;
	},
	updateRightPaddlePosition(state, payload) {
		state.rightPaddle = payload.rightPaddle;

		return state;
	},
	updateGameScore(state, payload) {
		state.score = payload.score;

		return state;
	},
	endGame(state) {
		state.gameStatus = 'ended';
		return state;
	},
	setWinner(state, payload) {
		state.winner = payload.winner;
		return state;
	},
};
