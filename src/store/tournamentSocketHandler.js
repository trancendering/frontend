import { Side } from "../enum/constant.js"
import { navigateTo } from "../views/utils/router.js";
/**
 * Tournament 게임 모드에서 userFullEvent 발생 시 호출되는 함수.
 * 게임 방과 게임과 관련된 상태를 초기화한 후, 게임 페이지로 이동한다.
 * @param {object} context
 * @param {object} payload
 */
function startTournament(context, payload) {
	// 게임 방 정보 세팅
	const userIndex = payload.intraId.indexOf(context.state.intraId);
	const userSide = userIndex % 2 === 0 ? Side.LEFT : Side.RIGHT;
	context.commit("setGameInfo", {
		gameInfo: {
			roomName: payload.roomName,
			intraId: payload.intraId,
			nickname: payload.nickname,
			userIndex: userIndex,
			userSide: userSide,
		},
	});

	console.log("EVENT: userFullEvent: startTournament");
	console.log("  roomName=", payload.roomName);
	console.log("  intraId=", payload.intraId);
	console.log("  nickname=", payload.nickname);
	console.log("  userIndex=", userIndex);
	console.log("  userSide=", userSide);

	// 게임 시작 전 초기화
	context.dispatch("initTournamentScores");
	context.dispatch("initTournamentWinners");
	context.dispatch("initPositions");
	context.dispatch("initScores");

	// 게임 페이지로 이동
	navigateTo("/tournament");
	context.commit("setRound", { round: 1 });
}

/**
 * 매 round마다 tournamentBracketModal이 뜬 다음에 호출되는 함수.
 * gameContext에 이번 round에 참여하는 사용자와 본인의 게임 참여 여부를 저장한다.
 * 또한 gameStatus를 "playing"으로 바꾼다. (-> 3초 기다리는 waitingModal 창이 뜨게함)
 * @param {object} context store 객체
 */
function startRound(context) {
	const curIndex = (context.state.round - 1) * 2;
	const gameContext = {
		leftUser: context.state.gameInfo.nickname[curIndex],
		rightUser: context.state.gameInfo.nickname[curIndex + 1],
		participated:
			curIndex === context.state.gameInfo.userIndex ||
			curIndex + 1 === context.state.gameInfo.userIndex,
	};
	context.commit("setGameContext", { gameContext });
	context.commit("setGameStatus", { gameStatus: "playing" });
}

/**
 * round가 끝난 후 진행될 round가 남아있는 경우 호출되는 함수.
 * @param {object} context store 객체
 * @param {object} payload {round, reason, winnerSide}
 */
function endRound(context, payload) {
	// tournamentScore, tournamentWinner 업데이트
	context.commit("updateTournamentScore", {
		round: `round${payload.round}`,
		leftScore: context.state.leftUserScore,
		rightScore: context.state.rightUserScore,
	});
	context.commit("updateTournamentWinner", {
		round: `round${payload.round}`,
		winnerSide: payload.winnerSide,
	});

	// 다음 round 번호 설정 -> Tournament Bracket Modal이 뜸
	context.commit("setRound", { round: payload.round + 1 });
}

/**
 * endGame 이벤트를 수신할 때, 즉 round가 끝나거나 비정상적으로 게임이 종료하는 경우,
 * 호출되는 함수.
 * 아직 진행되어야 하는 round가 남아있는 경우 endRound 함수를 호출하고,
 * 게임이 완전히 종료되어야하는 경우 gameStatus를 "ended"로 바꾼다.
 * @param {object} context store 객체
 * @param {object} payload {round, reason, winnerSide}
 * @returns
 */
function endTournament(context, payload) {
	console.log("EVENT: endGame: endTournamentRound");
	console.log("  round=", payload.round);
	console.log("  endReason=", payload.reason);
	console.log("  winnerSide=", payload.winnerSide);
	console.log("  leftScore=", context.state.leftUserScore);
	console.log("  rightScore=", context.state.rightUserScore);

	// 진행되어야할 round가 남은 경우, endRound 호출
	if (payload.reason === "normal" && payload.round != 3) {
		endRound(context, payload);
		return;
	}

	if (context.state.socket) {
		context.state.socket.disconnect();
		context.commit("setSocket", { socket: null });
	}

	context.commit("setEndReason", { endReason: payload.reason });
	if (context.state.endReason === "normal")
		context.commit("setRound", { round: 0 });
	else
		context.commit("setGameStatus", { gameStatus: "ended" });
}

export {
	startTournament,
	startRound,
	endRound,
	endTournament,
};

