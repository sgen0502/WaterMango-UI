import React from 'react';
import { Chip } from '@material-ui/core';
import { PlantStatus } from '../../../Model/Models';


type PlantStatusProps = {
    status: number
}

const PlantStatusChip = (props: PlantStatusProps) => {

    const getColor = () => {
        switch(props.status){
            case PlantStatus.WATERING:
                return "primary";
            case PlantStatus.WAITING:
                return "secondary";
            case PlantStatus.ALERT:
                return "secondary";
            default:
                return "default";
        }
    }

    const getOutlined= () => {
        switch(props.status){
            case 3:
                return "outlined";
            default:
                return "default";
        }
    }

    const getLabel = () => {
        switch(props.status){
            case PlantStatus.WATERING:
                return "Feeding water";
            case PlantStatus.WAITING:
                return "This plant needs to rest.";
            case PlantStatus.ALERT:
                return "Was not feed for 6 hours!";
            default:
                return "Give water!";
        }
    }

    return(
        <React.Fragment>
            <Chip variant={getOutlined()} color={getColor()} label={getLabel()} />
        </React.Fragment>
    )
}

export default  PlantStatusChip;