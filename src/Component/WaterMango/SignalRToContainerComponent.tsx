import React from 'react'
import PlantContainer from '../../Container/PlantContainer'
import PlantStatusSignalRChannel from '../../Service/SignalR/PlantStatusSignalRChannel';

type SignalRToContainerProps = {
    container: PlantContainer
}

export const SignalRToContainerComponent = (props: SignalRToContainerProps) => {
    
    React.useEffect(() =>{
        const signalHub: PlantStatusSignalRChannel = new PlantStatusSignalRChannel();
        signalHub.assign("StatusUpdate", props.container.loadRows)
    }, [])
    
    return (
        <div/>
    )
}