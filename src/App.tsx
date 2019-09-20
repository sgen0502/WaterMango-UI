import React, { Component } from 'react';
import './App.css';
import { Container, Grid} from '@material-ui/core';
import WaterMangoHeader from './Component/Header/WaterMangoHeader';
import PlantTable from './Component/WaterMango/Table/PlantTable';
import { Provider, Subscribe } from 'unstated'
import PlantContainer from './Container/PlantContainer';
import { SignalRToContainerComponent } from './Component/WaterMango/SignalRToContainerComponent';
import { SnackbarProvider } from 'notistack';
import SignalRContainer from './Container/SignalRContainer';

type AppState = {
    loading: boolean
}

const Headers: string[] = ["Name", "When did water?", "Status", "Give Water!"]

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
                                <Subscribe to={[PlantContainer, SignalRContainer]}> 
                                    { (container: PlantContainer, signalRContainer: SignalRContainer) => (
                                        <SignalRToContainerComponent container={container} signalrContainer={signalRContainer}/>
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
