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
import { SignalRToContainerComponent } from './Component/WaterMango/SignalRToContainerComponent';
import { SnackbarProvider } from 'notistack';

type AppState = {
    loading: boolean
}

const Headers: string[] = ["Name", "When did water?", "Status", " ", "Give Water!"]

class App extends Component<{}, AppState>{
    constructor(props: any) {
        super(props);
        this.state = { loading: true };
    }

    render() {
        return (
            <Provider>
            <SnackbarProvider maxSnack={3}>
            <div>
                <WaterMangoHeader title="Water Mango"/>
                <main>
                    <div className="content">
                        <Container maxWidth="lg">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                <Subscribe to={[PlantContainer]}> 
                                    { (container: PlantContainer) => (
                                        <PlantTable title="Plants Status" headers={Headers} container={container}/>
                                    )}
                                </Subscribe>
                                <Subscribe to={[PlantContainer]}> 
                                    { (container: PlantContainer) => (
                                        <SignalRToContainerComponent container={container}/>
                                    )}
                                </Subscribe>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </main>
            </div>
            </SnackbarProvider>
            </Provider>
        );
    }
}

export default App;
