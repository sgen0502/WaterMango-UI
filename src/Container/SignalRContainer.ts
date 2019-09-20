import { Container } from 'unstated'
import { PlantModel } from '../Model/Models';
import PlantStatusSignalRChannel from '../Service/SignalR/PlantStatusSignalRChannel';

class SignalRContainer extends Container<{}> {
    signalHub: PlantStatusSignalRChannel = new PlantStatusSignalRChannel();

    constructor() {
        super();
        this.sendStatusUpdate = this.sendStatusUpdate.bind(this);    
        this.assign = this.assign.bind(this); 
    }

    assign(topic: string, action: () => any){
        this.signalHub.assign(topic, action);
    }

    assignWithArgs(topic: string, action: (id: number, status: number, date: Date) => any){
        this.signalHub.assignWithArgs(topic, action);
    }

    sendStatusUpdate(plant: PlantModel){
        this.signalHub.invoke(plant.id, plant.status, plant.lastUpdate);
    }
}

export default SignalRContainer;