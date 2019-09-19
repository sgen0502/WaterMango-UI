import React from 'react';
import { TableRow, TableCell, Button } from '@material-ui/core';
import JsonRestClient from '../../../Utils/JsonRestClient';
import { AppConfig } from '../../../Utils/Config';
import PlantContainer from '../../../Container/PlantContainer';
import { Subscribe } from 'unstated';
import { PlantModel } from '../../../Model/Models';

type PlantRowProps = {
    row: PlantModel
}

const PlantRow = (props: PlantRowProps) => {
    const request = new JsonRestClient(AppConfig.uris.base);
    
    const handleClick = (container: PlantContainer) =>{
        request.post(AppConfig.uris.update.concat(String(props.row.id)), props.row)
    }

    return(
        <React.Fragment>
            <Subscribe to={[PlantContainer]}> 
            { (container: PlantContainer) => (
                <TableRow key={props.row.id}>
                    <TableCell>{props.row.name}</TableCell>
                    <TableCell>{props.row.lastUpdate}</TableCell>
                    <TableCell>{props.row.isResting ? "Yes" : "No"}</TableCell>
                    <TableCell>{props.row.isAlert? "Yes" : "No"}</TableCell>
                    <TableCell align="right"><Button variant="contained" color="primary" onClick={() => handleClick(container)}>Water {props.row.name}</Button></TableCell>
                </TableRow>
            )}
            
            </Subscribe>
        </React.Fragment>
    )
}

export default PlantRow;