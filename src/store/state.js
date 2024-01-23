export default {
	intraId: "intraId(hyeyukim)",
	isLoggedIn: false,
	languageId: "en",

	// Game Option
	gameMode: "Single", // or "Tournament"
	fancyBall: "fancy", // or "normal"

	// Real-time Game
	socket: null,
    // game Info
    gameInfo: {
        roomName: "",
        leftUser: "",
        rightUser: "",
        userSide: "left", // or "right"
    },
	// roomName: "",
	// leftUser: "",
	// rightUser: "",
	// userSide: "left", // or "right"
	// game status
	gameStatus: "ended", // or "playing" or "ended"
	score: { left: 0, right: 0 },
	leftPaddle: 200,
	rightPaddle: 200,
	ballPosition: { x: 0, y: 0 },
	// after game end
	winner: null,
	// before game start
	countDown: false,
};
