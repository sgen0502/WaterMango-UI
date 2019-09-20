import React from 'react'
import PlantContainer from '../../Container/PlantContainer'
import SignalRContainer from '../../Container/SignalRContainer';
import { useSnackbar } from 'notistack';
import { PlantStatus } from '../../Model/Models';

type SignalRToContainerProps = {
    container: PlantContainer,
    signalrContainer: SignalRContainer
}

export const SignalRToContainerComponent = (props: SignalRToContainerProps) => {
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() =>{
        props.signalrContainer.assign("StatusUpdate", props.container.loadRows);
        props.signalrContainer.assignWithArgs("StatusUpdate", (id: number, status: number, date: Date) => {
            if(status === PlantStatus.ALERT) enqueueSnackbar(`Alert! Plant ID = ${id} was not feed for 6 hours.`, { variant: "error"})
        });
    }, [enqueueSnackbar, props.container.loadRows, props.signalrContainer])
    
    return (
        <div/>
    )
}