import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

export default class PlantStatusSignalRChannel{
    private connection: HubConnection;

    constructor() {
        this.connection = new HubConnectionBuilder().withUrl('https://localhost:5001/plantstatushub').build();
        this.connectionSettings();

    }

    private async connectionSettings() {
        // For testing SignalR
        this.connection.on('ReceiveMessage', (u: string, m: string) => {
          console.log(`${u} ${m}`)
        });
        this.connection.on('StatusUpdate', (u: number, m: string, d: Date) => {
            console.log(`${u} ${m} ${d}`)
        });

        
        // start Connection
        await this.connection.start()
          .then(() => console.log('Connected'))
          .catch(() => console.log('Failed to Connect'));

        this.connection.invoke('ConnectStateManager')
          .then(() => console.log('Successfully sent a message'))
          .catch(() => console.log('Failed to send a message'));
    } 

    assign(topic: string, action: () => any){
        this.connection.on(topic, () => {
            action();
        });
    }

    assignWithArgs(topic: string, action: (id: number, status: number, lastUpdate: Date) => any){
        this.connection.on(topic, (id: number, status: number, lastUpdate: Date)=> {
            action(id, status, lastUpdate);
        });
    }

    invoke(id: number, status: number, date: Date) {
        this.connection.invoke('SendStatusUpdate', id, status, date)
        .then(() => console.log('Successfully sent a message'))
        .catch(() => console.log('Failed to send a message'));
    }
}
