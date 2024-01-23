import {Server} from "socket.io";

interface GameState {
    users: { left: string, right: string };
    scores: { left: number, right: number };
    paddlePositions: { left: number, right: number };
    ballPosition: { x: number, y: number };
    ballVelocity: { x: number, y: number };
    isPaused: boolean;
    isEnded: boolean;
    readyUserCount: number;
}

export class GameService {
    private games = new Map<string, any>();
    private server: Server;

    createGame(roomName: string, server: Server, leftUserIntraId: string, rightUserIntraId: string) {
        this.server = server;
        const gameState: GameState = {
            users: {left: leftUserIntraId, right: rightUserIntraId},
            scores: {left: 0, right: 0},
            paddlePositions: {left: 200, right: 200},
            ballPosition: {x: 400, y: 200},
            ballVelocity: {x: 4, y: 4},
            isPaused: false,
            isEnded: false,
            readyUserCount: 0,
        };
        this.games.set(roomName, gameState);
    }

    handleUserReadyEvent(roomName: string) {
        const gameState = this.games.get(roomName);
        if (!gameState) return;

        // Increment the ready user count
        gameState.readyUserCount++;

        // If both users are ready, start the game loop
        if (gameState.readyUserCount === 2) {
            this.startGameLoop(roomName);
        }
    }

    private startGameLoop(roomName: string): void {
        const gameInterval = setInterval(() => {
            const gameState = this.games.get(roomName);

            if (!gameState || gameState.isPaused) {
                return;
            }

            this.updateBallPosition(gameState);
            this.checkCollisionsAndUpdateScores(gameState, roomName);

            if (this.isGameOver(gameState)) {
                clearInterval(gameInterval);
                gameState.isEnded = true;
                this.server.to(roomName).emit('updateGameStatus', gameState);
                return;
            }

            this.server.to(roomName).emit('updateGameStatus', gameState);
        }, 16);
    }

    private updateBallPosition(gameState: any) {
        gameState.ballPosition.x += gameState.ballVelocity.x;
        gameState.ballPosition.y += gameState.ballVelocity.y;
    }

    updatePaddlePosition(roomName: string, userSide: string, newPosition: number) {
        const gameState = this.games.get(roomName);
        if (!gameState) return;

        gameState.paddlePositions[userSide] = newPosition;
    }

    private checkCollisionsAndUpdateScores(gameState: any, roomName: string) {
        this.handleWallCollision(gameState);
        this.handlePaddleCollision(gameState);
        this.handleScoring(gameState, roomName);

    }

    private handleWallCollision(gameState: any) {
        if (gameState.ballPosition.y <= 0 || gameState.ballPosition.y >= 400) {
            gameState.ballVelocity.y *= -1;
        }
    }

    private handlePaddleCollision(gameState: any) {
        if (gameState.ballPosition.x <= 10 &&
            gameState.ballPosition.y >= gameState.paddlePositions.left - 20 &&
            gameState.ballPosition.y <= gameState.paddlePositions.left + 20) {
            gameState.ballVelocity.x *= -1;
        } else if (gameState.ballPosition.x >= 790 &&
            gameState.ballPosition.y >= gameState.paddlePositions.right - 20 &&
            gameState.ballPosition.y <= gameState.paddlePositions.right + 20) {
            gameState.ballVelocity.x *= -1;
        }
    }

    private handleScoring(gameState: any, roomName: string) {
        let scored = false;

        if (gameState.ballPosition.x <= 0) {
            gameState.scores.right++;
            scored = true;
        } else if (gameState.ballPosition.x >= 800) {
            gameState.scores.left++;
            scored = true;
        }

        if (scored) {
            gameState.isPaused = true;
            this.resetBall(gameState);
            setTimeout(() => {
                gameState.isPaused = false;
            }, 2000);
        }
    }

    private resetBall(gameState: any) {
        gameState.ballPosition = {x: 400, y: 200};

        gameState.ballVelocity = {x: Math.random() * 4 + 3, y: Math.random() * 4 + 3};
        console.log(gameState.ballVelocity);
    }

    private isGameOver(gameState: any): boolean {
        return gameState.scores.left >= 2 || gameState.scores.right >= 2;
    }
}