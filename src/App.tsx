import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import './App.css';
import { Typography, AppBar, Toolbar, IconButton, Container, Grid, Table, TableHead, TableRow, TableCell, TableBody, Link, CircularProgress } from '@material-ui/core';
import classes from '*.module.css';
import WaterMangoHeader from './Component/Header/WaterMangoHeader';
import PlantTable from './Component/WaterMango/Table/PlantTable';
import JsonRestClient from './Utils/JsonRestClient';
import { AppConfig } from './Utils/Config';
import { PlantModel } from './Model/Models';
import { Provider, Subscribe } from 'unstated'
import PlantContainer from './Container/PlantContainer';
type AppState = {
    loading: boolean
}

const Headers: string[] = ["Name", "When did water?", "x", "y", "z"]

class App extends Component<{}, AppState>{

    request = new JsonRestClient(AppConfig.uris.base);
    container: PlantContainer = new PlantContainer();

    constructor(props: any) {
        super(props);
        this.state = { loading: true };
    }

    async componentWillMount() {
        await this.fetchPlants();
        //this.setState({ loading: false });
    }

    async fetchPlants(){
        let response = await this.request.getTyped<PlantModel[]>(AppConfig.uris.getAll);
        if(response) this.container.setRows(response.data);
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
                                    { (contaianer: PlantContainer) =>(
                                            <PlantTable title="Plants Status" headers={Headers} rows={contaianer.getRows()}/>
                                        )
                                    }
                                </Subscribe>
                                </Grid>
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
