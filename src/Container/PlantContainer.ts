import { Container } from 'unstated'
import { PlantModel } from '../Model/Models';

type PlantContainerState ={
    rows: PlantModel[]
}

class PlantContainer extends Container<PlantContainerState> {
    state = {
        rows: []
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