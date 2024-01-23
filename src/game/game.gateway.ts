import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {GameService} from './game.service';

@WebSocketGateway({namespace: '/game', cors: true})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private clients = new Map<string, { nickname: string, intraId: string, isSpeedUp: boolean }>();
    private waitingQueue: string[] = [];

    constructor(private gameService: GameService) {
    }

    handleConnection(client: Socket, ...args: any[]) {
        const {nickname, intraId, isSpeedUp} = this.extractClientInfo(client);
        console.log(`Client connected: ${client.id} - ${nickname} - ${intraId} - ${isSpeedUp}`)

        // Store client details
        this.clients.set(client.id, {nickname, intraId, isSpeedUp});

        // Add client to waiting queue
        this.addToQueue(client.id);
    }

    private extractClientInfo(client: Socket): { nickname: string, intraId: string, isSpeedUp: boolean } {
        const query = client.handshake.query;
        return {
            nickname: Array.isArray(query.nickname) ? query.nickname[0] : query.nickname,
            intraId: Array.isArray(query.intraId) ? query.intraId[0] : query.intraId,
            isSpeedUp: query.isSpeedUp === 'true'
        };
    }

    handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log(`Client disconnected: ${client.id}`);

        // Remove client from waiting queue
        this.removeFromQueue(client.id);

        // Remove client details
        this.clients.delete(client.id);
    }

    private addToQueue(clientId: string): void {
        console.log(`[GameGateway] addToQueue: ${clientId}`);

        this.waitingQueue.push(clientId);
        this.tryToPairPlayers();
    }

    private tryToPairPlayers(): void {
        console.log(`[GameGateway] tryToPairPlayers`);

        if (this.waitingQueue.length >= 2) {
            const [leftUserId, rightUserId] = [this.waitingQueue.shift(), this.waitingQueue.shift()];
            const roomName = `room-${Date.now()}`;

            console.log(`[GameGateway] Players paired: ${leftUserId} and ${rightUserId} in room ${roomName}`);

            // Get the Socket objects for the clients
            // Join players to the room using the 'to' method
            this.server.to(leftUserId).socketsJoin(roomName);
            this.server.to(rightUserId).socketsJoin(roomName);

            const leftUserIntraId = this.clients.get(leftUserId)?.intraId;
            const rightUserIntraId = this.clients.get(rightUserId)?.intraId;

            this.server.to(roomName).emit('userFullEvent', {
                roomName,
                users: {left: leftUserIntraId, right: rightUserIntraId}
            });

            this.gameService.createGame(roomName, this.server, leftUserIntraId, rightUserIntraId);
        }
    }

    private removeFromQueue(clientId: string): void {
        console.log(`[GameGateway] removeFromQueue: ${clientId}`);

        this.waitingQueue = this.waitingQueue.filter(id => id !== clientId);
    }

    @SubscribeMessage('userReadyEvent')
    handleUserReady(@MessageBody() data: { roomName: string }) {
        console.log(`[GameGateway] handleUserReady: ${data.roomName}`);

        // Forward the input to GameService for processing
        this.gameService.handleUserReadyEvent(data.roomName);
    }

    @SubscribeMessage('updatePaddlePosition')
    handlePaddlePositionUpdate(@MessageBody() data: { roomName: string, userSide: string, paddlePosition: number }) {
        console.log(`[GameGateway] handlePaddlePositionUpdate: ${data.userSide} - ${data.paddlePosition}`);

        // Forward the input to GameService for processing
        this.gameService.updatePaddlePosition(data.roomName, data.userSide, data.paddlePosition);
    }
}
