import { Container } from 'unstated'
import { PlantModel } from '../Model/Models';
import JsonRestClient from '../Utils/JsonRestClient';
import { AppConfig } from '../Utils/Config';
import { NormalizePlantModelArray } from '../Utils/ArrayHelper';

type SignalRContainerState ={
    rows: PlantModel[]
}

class SignalRContainer extends Container<SignalRContainerState> {
    request = new JsonRestClient(AppConfig.uris.base);
    plants: PlantModel[] = [];
    state = {
        rows: []
    }

    constructor() {
        super();
        this.loadRows = this.loadRows.bind(this);    
    }
    

    async loadRows(){
        let response = await this.request.getTyped<PlantModel[]>(AppConfig.uris.getAll);
        if(response) this.setRows(response.data);
    }

    setRows(inputRows: PlantModel[]){
        this.plants = inputRows;
        this.setState({rows: inputRows});
    }

    getRows(){
        return this.state.rows;
    }

    updateRow(id: number, input: PlantModel){
        const index = this.plants.findIndex(p => p.id === id);
        this.plants[index] = input;
        this.setState({rows: this.plants});
    }
}

export default SignalRContainer;