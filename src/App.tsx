import React, { Component } from 'react';
import './App.css';
import { Button, Container, Grid} from '@material-ui/core';
// import classes from '*.module.css';
import WaterMangoHeader from './Component/Header/WaterMangoHeader';
import PlantTable from './Component/WaterMango/Table/PlantTable';
// import JsonRestClient from './Utils/JsonRestClient';
// import { AppConfig } from './Utils/Config';
// import { PlantModel } from './Model/Models';
import { Provider, Subscribe } from 'unstated'
import PlantContainer from './Container/PlantContainer';
import PlantStatusSignalRChannel from './Service/SignalR/PlantStatusSignalRChannel';
type AppState = {
    loading: boolean
}

const Headers: string[] = ["Name", "When did water?", "x", "y", "z"]

class App extends Component<{}, AppState>{
    container: PlantContainer = new PlantContainer();
    signalHub: PlantStatusSignalRChannel;

    constructor(props: any) {
        super(props);
        this.signalHub = new PlantStatusSignalRChannel();
        this.state = { loading: true };
        this.sendMessage = this.sendMessage.bind(this);
    }

    async componentWillMount() {
        await this.container.loadRows();
    }

    sendMessage(){
        if(this.signalHub) this.signalHub.invoke("A", "B");
    }

    render() {
        return (
            <Provider>
            <div>
                <WaterMangoHeader title="Water Mango"/>
                <main>
                    <div className="content">
                        <Container maxWidth="lg">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                <Subscribe to={[this.container]}> 
                                    { (container: PlantContainer) => (
                                        <PlantTable title="Plants Status" headers={Headers} container={container}/>
                                    )}
                                </Subscribe>
                                </Grid>
                                <Button variant="contained" color="primary" onClick={this.sendMessage}>Click Me</Button>
                            </Grid>
                        </Container>
                    </div>
                </main>
            </div>
            </Provider>
        );
    }
}

export default App;
