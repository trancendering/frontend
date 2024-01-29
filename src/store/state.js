export default {
	intraId: "intraId(hyeyukim)",
	isLoggedIn: false,
	languageId: "en",

	// Game Option
	gameMode: "Single", // or "Tournament"
	fancyBall: "fancy", // or "normal"

	// 공통 게임 정보: 게임이 종료되었을 때 업데이트
	endReason: "normal", // or "opponentLeft"
	// 공통 게임 정보: 게임이 시작되면 업데이트
	gameStatus: "ended", // or "playing"
	gameContext: {
		roomName: "",
		leftUser: "-",
		rightUser: "-",
		participated: false,
		userSide: "left",
	},
	// 공통 게임 정보: 게임 도중 실시간으로 업데이트
	leftUserScore: 0,
	rightUserScore: 0,
	ballPosition: { x: 0, y: 0 },
	leftPaddlePosition: 200,
	rightPaddlePosition: 200,

	// single game 정보
	winner: null, // 최근 라운드 우승자의 nickname

	// tournament 정보
	round: 0,
	tournamentPlayers: [], // [nickname, nickname, ...]
	tournamentScore: {
		round1: ["-", "-"], // [leftScore, rightScore]
		round2: ["-", "-"],
		round3: ["-", "-"],
	},
	tournamentWinner: {
		round1: "-", // nickname
		round2: "-",
		round3: "-",
	},
};
