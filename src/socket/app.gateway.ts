import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';


@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
   
    @WebSocketServer() server;

    private logger = new Logger('AppGateway');

    constructor() { }
        
    public afterInit(server) {
        this.logger.log('AfterInit');
    }
    
    handleConnection(client) {
        this.logger.log('New client connected');
    }
    
    handleDisconnect(client) {
        this.logger.log('Client disconnected');
    }


    @SubscribeMessage('subscribetovehicle')
    onSubscribeChatWindow(client, vehicleID: string) {
        console.log("RoomID: " + vehicleID);
        client.join(vehicleID);
    }

    @SubscribeMessage('onVehicleMonitor')
    onVehicleDataMonitor(client, data) {
        console.log("onVehicleMonitor")
        console.log(data.vehicleID);
        this.server.in(data.vehicleID).emit('onNewData', data);
    }
}   