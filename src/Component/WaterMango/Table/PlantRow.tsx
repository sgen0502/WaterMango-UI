import React from 'react';
import { TableRow, TableCell, Button, Chip } from '@material-ui/core';
import JsonRestClient from '../../../Utils/JsonRestClient';
import { AppConfig } from '../../../Utils/Config';
import PlantContainer from '../../../Container/PlantContainer';
import { PlantModel } from '../../../Model/Models';
import moment from 'moment';
import {Subscribe } from 'unstated';
import {PlantStatusChip} from './PlantStatusChip';
import { useSnackbar } from 'notistack';

type PlantRowProps = {
    row: PlantModel
}

const PlantRow = (props: PlantRowProps) => {
    const request = new JsonRestClient(AppConfig.uris.base);
    const { enqueueSnackbar } = useSnackbar();
    
    const handleClick = async (container: PlantContainer) =>{
        try{
            await request.put(AppConfig.uris.update.concat(String(props.row.id)));
            container.loadRows();
        }
        catch{
            enqueueSnackbar(`Not able to give water for ${props.row.name}`, { variant: "error"});
        }
    }

    return(
        <React.Fragment>
            <Subscribe to={[PlantContainer]}>
            { (container: PlantContainer) => (
                <TableRow key={props.row.id}>
                    <TableCell>{props.row.name}</TableCell>
                    <TableCell>{moment(props.row.lastUpdate).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                    <TableCell><PlantStatusChip status={props.row.status}/></TableCell>
                    <TableCell>Show something</TableCell>
                    <TableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleClick(container)}>Give Water to {props.row.name}</Button>
                    </TableCell>
                </TableRow>
            )}
            </Subscribe>
        </React.Fragment>
    )
}

export default PlantRow;