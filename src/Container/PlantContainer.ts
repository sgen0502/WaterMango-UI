import { Container } from 'unstated'
import { PlantModel } from '../Model/Models';
import JsonRestClient from '../Utils/JsonRestClient';
import { AppConfig } from '../Utils/Config';

type PlantContainerState ={
    rows: PlantModel[]
}

class PlantContainer extends Container<PlantContainerState> {
    request = new JsonRestClient(AppConfig.uris.base);
    
    state = {
        rows: []
    }

    async loadRows(){
        let response = await this.request.getTyped<PlantModel[]>(AppConfig.uris.getAll);
        if(response) this.setRows(response.data);
    }


    setRows(inputRows: PlantModel[]){
        this.setState({rows: inputRows});
    }

    // getRows(){
    //     return this.state.rows;
    // }

    getRows(){
        return this.state.rows;
    }

    updateRow(id: number, input: PlantModel){

    }
}

export default PlantContainer;