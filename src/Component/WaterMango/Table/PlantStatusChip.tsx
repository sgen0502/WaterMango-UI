import React from 'react';
import { Chip } from '@material-ui/core';


type PlantStatusProps = {
    status: number
}

export const PlantStatusChip = (props: PlantStatusProps) => {

    const getColor = () => {
        switch(props.status){
            case 1:
                return "primary";
            case 2:
                return "secondary";
            case 3:
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

    return(
        <React.Fragment>
            <Chip variant={getOutlined()} color={getColor()} label={props.status} />
        </React.Fragment>
    )
}