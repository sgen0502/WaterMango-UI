import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

export default class PlantStatusSignalRChannel{
    private connection: HubConnection;

    constructor() {
        this.connection = new HubConnectionBuilder().withUrl('https://localhost:5001/plantstatushub').build();
        this.connectionSettings();
    }

    private connectionSettings() {
        // 通知を受け取る SampleHubのSendAsyncに指定したターゲットに第一引数を合わせる
        this.connection.on('ReceiveMessage', (u: string, m: string) => {
          console.log(`${u} ${m}`)
        });
        // コネクション開始
        this.connection.start()
          .then(() => console.log('接続成功'))
          .catch(() => console.log('接続失敗'));
    } 

    invoke(user: string, message: string) {
    // サーバーにメッセージを送信する
    // invokeメソッドの第一引数にはHubクラスに定義したメソッド名を指定する
    this.connection.invoke('SendMessage', user, message)
        .then(() => console.log('送信成功'))
        .catch(() => console.log('送信失敗'));
    }
}
