import React from 'react';
import { Button} from '@material-ui/core';
import JsonRestClient from '../../../Utils/JsonRestClient';
import { AppConfig } from '../../../Utils/Config';
import PlantContainer from '../../../Container/PlantContainer';
import { PlantModel, PlantStatus } from '../../../Model/Models';
import {Subscribe } from 'unstated';
import { useSnackbar } from 'notistack';
import SignalRContainer from '../../../Container/SignalRContainer';

type PlantRowProps = {
    row: PlantModel
}

const PlantGiveWaterButton = (props: PlantRowProps) => {
    const request = new JsonRestClient(AppConfig.uris.base);
    const { enqueueSnackbar } = useSnackbar();
    
    const handleClick = async (container: PlantContainer, signal: SignalRContainer) =>{
        try{
            await request.put(AppConfig.uris.update.concat(String(props.row.id)));
            container.loadRows();
            signal.sendStatusUpdate(props.row);
        }
        catch{
            enqueueSnackbar(`${props.row.name} is current resting.`, { variant: "warning"});
        }
    }

    const getLabel = () => {
        return props.row.status === PlantStatus.WATERING 
               ? `Cancel Watering for ${props.row.name}` 
               : `Give Water to ${props.row.name}`;
    }

    const getColor = () => {
        return props.row.status === PlantStatus.WATERING 
               ? "secondary"
               : "primary"
    }


    return(
        <React.Fragment>
            <Subscribe to={[PlantContainer, SignalRContainer]}>
            { (container: PlantContainer, signal: SignalRContainer) => (
                    <Button variant="contained" color={getColor()} onClick={() => handleClick(container, signal)}>{getLabel()}</Button>
            )}
            </Subscribe>
        </React.Fragment>
    )
}

export default PlantGiveWaterButton;