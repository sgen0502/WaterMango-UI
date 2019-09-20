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

        // コネクション開始
        await this.connection.start()
          .then(() => console.log('Connected'))
          .catch(() => console.log('Failed to Connect'));

        this.connection.invoke('ConnectStateManager')
          .then(() => console.log('Successfully sent a message'))
          .catch(() => console.log('Failed to send a message'));
    } 

    assign(topic: string, action: () => any){
        this.connection.on(topic, (id: number, date: Date, status: number) => {
            action();
        });
    }

    invoke(id: number, date: Date, status: number) {
        this.connection.invoke('SendStatusUpdate')
        .then(() => console.log('Successfully sent a message'))
        .catch(() => console.log('Failed to send a message'));
    }
}
