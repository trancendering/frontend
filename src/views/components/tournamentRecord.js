import store from "../../store/index.js";
import Component from "../../library/component.js";

export default class TournamentRecord extends Component {
	constructor(params) {
		super({
			store,
			element: document.getElementById("app"),
		});
		this.render();
		this.tournamentLogData = "";
		this.tournamentData = "";
		this.tournamentList = document.getElementById("tournamentList");
	}

	async render() {
		console.log("render tournament page");

		const view = /*html*/ `
            <div class="container mt-5">
                <row>
                    <div class="col-md-12 mb-5 mt-4 d-flex align-items-center justify-content-center">
                        <h1>Tournament Log</h1>
                    </div>
                </row>
                <ul id="tournamentList" class="list-group">
                    <!-- Tournament data will be appended here -->
                </ul>
            </div>
        `;

		this.element.innerHTML = view;
		this.getTournamentLog();
	}

	async getTournamentLog() {
		await fetch("/tournament/log")
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				this.tournamentLogData = data;
				this.populateTournamentList();
			});
	}

	async populateTournamentList() {
		// Clear any existing content
		// Parse the tournament log data and get the tournament list container
		try {
			const tournamentData = this.tournamentData;
			const tournamentLogData = this.tournamentLogData;
			const tournamentList = this.tournamentList;

			tournamentData = JSON.parse(tournamentLogData);
			console.log(tournamentData);
			console.log(tournamentData.tournamentLog);

			tournamentData.tournamentLog.forEach((tournamentData, index) => {
				const tournamentItem = document.createElement("li");
				tournamentItem.className =
					"list-group-item shadow mt-4 border rounded";
				tournamentItem.innerHTML = `<h4>Tournament ${index + 1}</h4>`;

				// check if there are games in the tournament
				if (tournamentData.tournament.length > 0) {
					const gameList = document.createElement("ul");
					gameList.className = "list-group ";

					tournamentData.tournament.forEach((game, gameIndex) => {
						const gameItem = this.createGameItem(game, gameIndex);
						gameList.appendChild(gameItem);
					});
					tournamentItem.appendChild(gameList);
				} else {
					tournamentItem.innerHTML +=
						"<p>No games in this tournament.</p>";
				}
				tournamentList.appendChild(tournamentItem);
			});
		} catch (error) {
			console.error("Error parsing tournament data: ", error);
		}
	}

	async createGameItem(game, gameIndex) {
		const gameItem = document.createElement("li");
		gameItem.className = "list-group-item";
		if (gameIndex === 2) {
			// gameItem.classList.add('bg-secondary');
			gameItem.classList.add("text-primary"); // Bootstrap 클래스를 사용하여 배경색 변경
		}
		const winnerTemplate = /*html*/ `<strong>Winner:</strong> <span class="name">${game.winner.name}</span>, <span class="score">Score: ${game.winner.score}</span>`;
		const loserTemplate = /*html*/ `<strong>Loser:</strong> <span class="name">${game.loser.name}</span>, <span class="score">Score: ${game.loser.score}</span>`;
		gameItem.innerHTML = /*html*/ `
            <div class="game-item">
                <div class="text-start game-id">Game ID: ${game.game_id}</div>
                <div class="text-start winner">${winnerTemplate}</div>
                <div class="text-start loser">${loserTemplate}</div>
            </div>
          `;
	}
}
