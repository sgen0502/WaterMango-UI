import React from 'react';
import { TableRow, TableCell, Button } from '@material-ui/core';
import JsonRestClient from '../../../Utils/JsonRestClient';
import { AppConfig } from '../../../Utils/Config';
import PlantContainer from '../../../Container/PlantContainer';
import { PlantModel } from '../../../Model/Models';
import moment from 'moment';


type PlantRowProps = {
    row: PlantModel,
    container: PlantContainer
}

const PlantRow = (props: PlantRowProps) => {
    const request = new JsonRestClient(AppConfig.uris.base);
    
    const handleClick = async (container: PlantContainer) =>{
        await request.put(AppConfig.uris.update.concat(String(props.row.id)));
        container.loadRows();
    }

    return(
        <React.Fragment>
            <TableRow key={props.row.id}>
                <TableCell>{props.row.name}</TableCell>
                <TableCell>{moment(props.row.lastUpdate).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                <TableCell>{props.row.isResting ? "Yes" : "No"}</TableCell>
                <TableCell>{props.row.isAlert? "Yes" : "No"}</TableCell>
                <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleClick(props.container)}>Give Water to {props.row.name}</Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default PlantRow;